import React, { Component } from "react";
import PropTypes from "prop-types";
// import "./Viewer.css";
import BookmarkItem from "./BookmarkItem";

/* import * as PdfJsLib from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import 'pdfjs-dist/web/pdf_viewer.css';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer'; */
//
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import * as pdfJsViewer from 'pdfjs-dist/web/pdf_viewer'; 
import {EventBus, PDFLinkService, PDFFindController, PDFViewer} from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";


const SEARCH_FOR = "Mozilla"; // try 'Mozilla';
const DEFAULT_SCALE_DELTA = 1.1;
const MATCHES_COUNT_LIMIT = 1000;

const MIN_SCALE = 0.1;
const MAX_SCALE = 10.0;

const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3,
};

class PdfFrame extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      pdf: undefined,
      scale: "auto",
      customScaleOptionValue: "custom",
      customScaleOptionTextContent: "custom",
      pageNumber: 1,
      numPages: 0,
      pageNumberInput: 1,
      sidebarOpen: false,
      findOpen: false,
      bookmarkItems: [],
      queryWord: undefined,
      findHighlightAll: true,
      findMatchCase: false,
      findWholeWords: false,
      findResultsCountSnow: false,
      findInputFound: true,
      findResultCount: undefined,
      findMsg: undefined,
    };

    this.viewerContainer = React.createRef();
    this.viewer = React.createRef();
    this.inputFind = React.createRef();
  }

  componentDidMount() {
    let container = this.viewerContainer.current;
    let viewer = this.viewer.current;

    //PdfJsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.3.200/pdf.worker.js';
    GlobalWorkerOptions.workerSrc =
      "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.js";
    getDocument(this.props.file).promise.then((pdf) => {
      this.setState({ numPages: pdf.numPages });

      this.eventBus = new pdfJsViewer.EventBus();

      this.pdfLinkService = new pdfJsViewer.PDFLinkService({
        eventBus: this.eventBus,
      });

      this.pdfFindController = new pdfJsViewer.PDFFindController({
        linkService: this.pdfLinkService,
        eventBus: this.eventBus,
      });

      this.pdfViewer = new pdfJsViewer.PDFViewer({
        container,
        viewer,
        linkService: this.pdfLinkService,
        eventBus: this.eventBus,
        findController: this.pdfFindController,
      });

      /*            this.pdfFindController.onUpdateResultsCount = (matchesCount) => {
                            this.updateResultsCount(matchesCount);
                        };*/

      this.pdfLinkService.setViewer(this.pdfViewer);

      //this.pdfViewer.setFindController(this.pdfFindController);

      this.pdfViewer.setDocument(pdf);
      this.pdfLinkService.setDocument(pdf, null);

      this.pdfViewer.onePageRendered.then(() => {
        pdf.getOutline().then((outline) => {
          this.outline = outline || null;

          if (!outline) {
            return;
          }
          this.setState({ bookmarkItems: outline });
        });
      });

      this.bindEvents();

      //execute initial find. This is used so the first search done by user is faster
      this.pdfFindController.executeCommand("find", {
        caseSensitive: this.state.findMatchCase,
        findPrevious: undefined,
        entireWord: this.state.findWholeWords,
        highlightAll: this.state.findHighlightAll,
        phraseSearch: true,
        query: "",
      });
    });
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    this.unbindEvents();
    document.removeEventListener("keydown", this.escFunction, false);
  }
  unbindEvents() {
    let { eventBus } = this;
    if (eventBus) {
      eventBus.off("pagechanging", this.webViewerPageChanging);
    }
  }

  bindEvents() {
    let { eventBus } = this;
    eventBus.on("pagechanging", this.webViewerPageChanging); // ZA UPDATE BROJA STRANICE NA SCROLL
  }

  escFunction = (event) => {
    if (event.keyCode === 114 || (event.ctrlKey && event.keyCode === 70)) {
      // Block CTRL + F event
      event.preventDefault();
      this.setState({ findOpen: true });
      this.inputFind.current.focus();
    } else if (event.keyCode === 13) {
      //if enter is pressed while "find" is open then enter should trigger next find
      if (this.state.findOpen) {
        this.onFindNextClick();
      }
    }
  };

  webViewerPageChanging = (evt) => {
    let page = evt.pageNumber;

    this.setState({ pageNumber: page });
    this.setState({ pageNumberInput: page });
  };

  updateResultsCount(total) {
    let matchesCountMsg = "",
      limit = MATCHES_COUNT_LIMIT;

    if (total > 0) {
      if (total > limit) {
        matchesCountMsg = "More than " + limit + "matches";
      } else {
        matchesCountMsg = total + " match";
      }
    }
    Promise.resolve(matchesCountMsg).then((msg) => {
      this.setState({ findResultCount: msg });
      if (total) {
        this.setState({ findResultsCountSnow: true });
      } else {
        this.setState({ findResultsCountSnow: false });
      }
    });
  }

  onNextPageClick = () => {
    if (this.state.numPages > this.state.pageNumber) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.setState({ pageNumberInput: this.state.pageNumber + 1 });

      this.pdfViewer.currentPageNumber++;
    }
  };
  onPreviousPageClick = () => {
    if (this.state.pageNumber > 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
      this.setState({ pageNumberInput: this.state.pageNumber - 1 });

      this.pdfViewer.currentPageNumber--;
    }
  };

  onPageNumberInputChange = (event) => {
    this.setState({ pageNumberInput: event.target.value });
  };

  onPageNumberInputKeyPress = (event) => {
    if (event.key === "Enter") {
      if (
        this.isInt(this.state.pageNumberInput) &&
        this.state.pageNumberInput > 0 &&
        this.state.pageNumberInput <= this.state.numPages
      ) {
        this.setState({ pageNumber: this.state.pageNumberInput });
        this.pdfViewer.currentPageNumber = parseInt(this.state.pageNumberInput);
      } else {
        this.setState({ pageNumberInput: this.state.pageNumber });
      }
    }
  };

  isInt(value) {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  }

  onZoomInClick = () => {
    this.zoomIn();
  };

  onZoomOutClick = () => {
    this.zoomOut();
  };

  onZoomSelectChange = (event) => {
    this.pdfViewer.currentScaleValue = event.target.value;
    this.setState({ scale: event.target.value });
  };

  onZoomManualChange = (value) => {
    setTimeout(
      function () {
        //Start the timer
        this.pdfViewer.currentScaleValue = value;
        this.setState({ scale: value });
      }.bind(this),
      50
    );
  };

  zoomIn(ticks) {
    let newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;

    let customScaleOptionTextContent = Math.floor(newScale * 100) + "%";
    this.setState({
      scale: newScale,
      customScaleOptionValue: newScale,
      customScaleOptionTextContent,
    });
  }

  zoomOut(ticks) {
    let newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;

    let customScaleOptionTextContent = Math.floor(newScale * 100) + "%";
    this.setState({
      scale: newScale,
      customScaleOptionValue: newScale,
      customScaleOptionTextContent,
    });
  }

  onFindChange = (event) => {
    this.setState({ queryWord: event.target.value });
    this.pdfFindController.executeCommand("find", {
      caseSensitive: this.state.findMatchCase,
      findPrevious: undefined,
      entireWord: this.state.findWholeWords,
      highlightAll: this.state.findHighlightAll,
      phraseSearch: true,
      query: event.target.value,
    });
  };

  onFindNextClick = (event) => {
    this.pdfFindController.executeCommand("findagain", {
      caseSensitive: this.state.findMatchCase,
      findPrevious: undefined,
      entireWord: this.state.findWholeWords,
      highlightAll: this.state.findHighlightAll,
      phraseSearch: true,
      query: this.state.queryWord,
    });
  };

  onFindPreviousClick = (event) => {
    this.pdfFindController.executeCommand("findagain", {
      caseSensitive: this.state.findMatchCase,
      findPrevious: true,
      entireWord: this.state.findWholeWords,
      highlightAll: this.state.findHighlightAll,
      phraseSearch: true,
      query: this.state.queryWord,
    });
  };

  onCheckboxChange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  onSidebarToggle = () => {
    if (this.state.sidebarOpen) {
      this.setState({ sidebarOpen: false });
    } else {
      this.setState({ sidebarOpen: true });
    }
  };

  onFindToggle = () => {
    if (this.state.findOpen) {
      this.setState({ findOpen: false });
    } else {
      this.setState({ findOpen: true });
    }
  };

  render() {
    const {
      numPages,
      pageNumberInput,
      scale,
      customScaleOptionValue,
      customScaleOptionTextContent,
      bookmarkItems,
      queryWord,
      findHighlightAll,
      findMatchCase,
      findWholeWords,
      findResultCount,
      findMsg,
    } = this.state;
    const { showDownload } = this.props;
    let toggleSidebarButtonClassName = this.state.sidebarOpen
      ? "toolbarButton toggled"
      : "toolbarButton";
    let outerContainerClassName = this.state.sidebarOpen ? "sidebarOpen" : "";
    let toggleFindButtonClassName = this.state.findOpen
      ? "toolbarButton toggled"
      : "toolbarButton";
    let findBarClassName = this.state.findOpen
      ? "findbar doorHanger"
      : "findbar hidden doorHanger";
    let findResultsCountClassName = this.state.findResultsCountSnow
      ? "toolbarLabel"
      : "toolbarLabel hidden";
    let findInputClassName = this.state.findInputFound
      ? "toolbarField"
      : "toolbarField notFound";
    return (
      <div className="loadingInProgress">
        <div id="outerContainer" className={outerContainerClassName}>
          <div id="sidebarContainer">
            <div id="toolbarSidebar">
              <div className="splitToolbarButton toggled">
                <button
                  id="viewOutline"
                  className="toolbarButton"
                  title="Show Document Outline (double-click to expand/collapse all items)"
                  tabIndex="3"
                  data-l10n-id="document_outline"
                >
                  <span data-l10n-id="document_outline_label">
                    Document Outline
                  </span>
                </button>
              </div>
            </div>
            <div id="sidebarContent">
              <div id="outlineView" className="outlineWithDeepNesting">
                {bookmarkItems.map((item) => {
                  return (
                    <BookmarkItem
                      key={item.title}
                      item={item}
                      pdfLinkService={this.pdfLinkService}
                      onZoomManualChange={this.onZoomManualChange}
                    />
                  );
                })}
              </div>
            </div>
            <div id="sidebarResizer" className="hidden"></div>
          </div>
          <div id="mainContainer">
            <div className={findBarClassName} id="findbar">
              <div id="findbarInputContainer">
                <input
                  id="findInput"
                  ref={this.inputFind}
                  className={findInputClassName}
                  title="Find"
                  onChange={this.onFindChange}
                  value={queryWord}
                  placeholder="Find in document…"
                  tabIndex="91"
                  data-l10n-id="find_input"
                />
                <div className="splitToolbarButton">
                  <button
                    id="findPrevious"
                    className="toolbarButton findPrevious"
                    title="Find the previous occurrence of the phrase"
                    tabIndex="92"
                    data-l10n-id="find_previous"
                    onClick={this.onFindPreviousClick}
                  >
                    <span data-l10n-id="find_previous_label">Previous</span>
                  </button>
                  <div className="splitToolbarButtonSeparator"></div>
                  <button
                    id="findNext"
                    className="toolbarButton findNext"
                    title="Find the next occurrence of the phrase"
                    tabIndex="93"
                    data-l10n-id="find_next"
                    onClick={this.onFindNextClick}
                  >
                    <span data-l10n-id="find_next_label">Next</span>
                  </button>
                </div>
              </div>
              <div id="findbarOptionsOneContainer">
                <input
                  type="checkbox"
                  id="findHighlightAll"
                  className="toolbarField"
                  tabIndex="94"
                  name="findHighlightAll"
                  checked={findHighlightAll}
                  onChange={this.onCheckboxChange}
                />
                <label
                  htmlFor="findHighlightAll"
                  className="toolbarLabel"
                  data-l10n-id="find_highlight"
                >
                  Highlight all
                </label>
                <input
                  type="checkbox"
                  id="findMatchCase"
                  className="toolbarField"
                  tabIndex="95"
                  checked={findMatchCase}
                  onChange={this.onCheckboxChange}
                />
                <label
                  htmlFor="findMatchCase"
                  className="toolbarLabel"
                  data-l10n-id="find_match_case_label"
                >
                  Match case
                </label>
              </div>
              <div id="findbarOptionsTwoContainer">
                <input
                  type="checkbox"
                  id="findEntireWord"
                  className="toolbarField"
                  tabIndex="96"
                  checked={findWholeWords}
                  onChange={this.onCheckboxChange}
                />
                <label
                  htmlFor="findEntireWord"
                  className="toolbarLabel"
                  data-l10n-id="find_entire_word_label"
                >
                  Whole words
                </label>
                <span
                  id="findResultsCount"
                  className={findResultsCountClassName}
                >
                  {findResultCount}
                </span>
              </div>

              <div id="findbarMessageContainer">
                <span id="findMsg" className="toolbarLabel">
                  {findMsg}
                </span>
              </div>
            </div>
            <div
              id="secondaryToolbar"
              className="secondaryToolbar hidden doorHangerRight"
            >
              <div id="secondaryToolbarButtonContainer">
                <button
                  id="firstPage"
                  className="secondaryToolbarButton firstPage"
                  title="Go to First Page"
                  tabIndex="56"
                  data-l10n-id="first_page"
                >
                  <span data-l10n-id="first_page_label">Go to First Page</span>
                </button>
                <button
                  id="lastPage"
                  className="secondaryToolbarButton lastPage"
                  title="Go to Last Page"
                  tabIndex="57"
                  data-l10n-id="last_page"
                >
                  <span data-l10n-id="last_page_label">Go to Last Page</span>
                </button>

                <div className="horizontalToolbarSeparator"></div>

                <button
                  id="pageRotateCw"
                  className="secondaryToolbarButton rotateCw"
                  title="Rotate Clockwise"
                  tabIndex="58"
                  data-l10n-id="page_rotate_cw"
                >
                  <span data-l10n-id="page_rotate_cw_label">
                    Rotate Clockwise
                  </span>
                </button>
                <button
                  id="pageRotateCcw"
                  className="secondaryToolbarButton rotateCcw"
                  title="Rotate Counterclockwise"
                  tabIndex="59"
                  data-l10n-id="page_rotate_ccw"
                >
                  <span data-l10n-id="page_rotate_ccw_label">
                    Rotate Counterclockwise
                  </span>
                </button>
              </div>
            </div>
            <div className="toolbar">
              <div id="toolbarContainer">
                <div id="toolbarViewer">
                  <div id="toolbarViewerLeft">
                    <button
                      id="sidebarToggle"
                      className={toggleSidebarButtonClassName}
                      title="Toggle Sidebar"
                      tabIndex="11"
                      data-l10n-id="toggle_sidebar"
                      onClick={this.onSidebarToggle}
                    >
                      <span data-l10n-id="toggle_sidebar_label">
                        Toggle Sidebar
                      </span>
                    </button>
                    <div className="toolbarButtonSpacer" />
                    <button
                      id="viewFind"
                      className={toggleFindButtonClassName}
                      title="Find in Document"
                      tabIndex="12"
                      data-l10n-id="findbar"
                      onClick={this.onFindToggle}
                    >
                      <span data-l10n-id="findbar_label">Find</span>
                    </button>
                    <div className="splitToolbarButton hiddenSmallView">
                      <button
                        className="toolbarButton pageUp"
                        title="Previous Page"
                        id="previous"
                        tabIndex="13"
                        data-l10n-id="previous"
                        onClick={this.onPreviousPageClick}
                      >
                        <span data-l10n-id="previous_label">Previous</span>
                      </button>
                      <div className="splitToolbarButtonSeparator" />
                      <button
                        className="toolbarButton pageDown"
                        title="Next Page"
                        id="next"
                        tabIndex="14"
                        data-l10n-id="next"
                        onClick={this.onNextPageClick}
                      >
                        <span data-l10n-id="next_label">Next</span>
                      </button>
                    </div>
                    <input
                      onChange={this.onPageNumberInputChange}
                      type="number"
                      onKeyPress={this.onPageNumberInputKeyPress}
                      id="pageNumber"
                      className="toolbarField pageNumber"
                      title="Page"
                      value={pageNumberInput}
                      size="4"
                      min="1"
                      tabIndex="15"
                      data-l10n-id="page"
                    />
                    <span id="numPages" className="toolbarLabel">
                      {numPages}
                    </span>
                  </div>
                  <div id="toolbarViewerRight">
                    {showDownload && (
                      <button
                        id="download"
                        className="toolbarButton download hiddenMediumView pointer"
                        title="Download"
                        tabIndex="34"
                        data-l10n-id="download"
                        onClick={this.props.onDownloadClick}
                      >
                        <span data-l10n-id="download_label">Download</span>
                      </button>
                    )}

                    {/*                                        <a href="#" id="viewBookmark" className="toolbarButton bookmark hiddenSmallView" title="Current view (copy or open in new window)" tabIndex="35" data-l10n-id="bookmark">
                                            <span data-l10n-id="bookmark_label">Current View</span>
                                        </a>

                                        <div className="verticalToolbarSeparator hiddenSmallView"></div>

                                        <button id="secondaryToolbarToggle" className="toolbarButton" title="Tools"
                                                tabIndex="36" data-l10n-id="tools">
                                            <span data-l10n-id="tools_label">Tools</span>
                                        </button>*/}
                  </div>
                  <div id="toolbarViewerMiddle">
                    <div className="splitToolbarButton">
                      <button
                        id="zoomOut"
                        className="toolbarButton zoomOut"
                        title="Zoom Out"
                        tabIndex="21"
                        data-l10n-id="zoom_out"
                        onClick={this.onZoomOutClick}
                      >
                        <span data-l10n-id="zoom_out_label">Zoom Out</span>
                      </button>
                      <div className="splitToolbarButtonSeparator"></div>
                      <button
                        id="zoomIn"
                        className="toolbarButton zoomIn"
                        title="Zoom In"
                        tabIndex="22"
                        data-l10n-id="zoom_in"
                        onClick={this.onZoomInClick}
                      >
                        <span data-l10n-id="zoom_in_label">Zoom In</span>
                      </button>
                    </div>
                    <span
                      id="scaleSelectContainer"
                      className="dropdownToolbarButton"
                    >
                      <select
                        id="scaleSelect"
                        title="Zoom"
                        tabIndex="23"
                        data-l10n-id="zoom"
                        onChange={this.onZoomSelectChange}
                        value={scale}
                      >
                        <option
                          id="pageAutoOption"
                          title=""
                          value="auto"
                          defaultValue="selected"
                          data-l10n-id="page_scale_auto"
                        >
                          Automatic Zoom
                        </option>
                        <option
                          id="pageActualOption"
                          title=""
                          value="page-actual"
                          data-l10n-id="page_scale_actual"
                        >
                          Actual Size
                        </option>
                        <option
                          id="pageFitOption"
                          title=""
                          value="page-fit"
                          data-l10n-id="page_scale_fit"
                        >
                          Page Fit
                        </option>
                        <option
                          id="pageWidthOption"
                          title=""
                          value="page-width"
                          data-l10n-id="page_scale_width"
                        >
                          Page Width
                        </option>

                        <option
                          id="customScaleOption"
                          title=""
                          value={customScaleOptionValue}
                          disabled="disabled"
                          hidden={true}
                        >
                          {customScaleOptionTextContent}
                        </option>

                        <option
                          title=""
                          value="0.5"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 50 }'
                        >
                          50%
                        </option>
                        <option
                          title=""
                          value="0.75"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 75 }'
                        >
                          75%
                        </option>
                        <option
                          title=""
                          value="1"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 100 }'
                        >
                          100%
                        </option>
                        <option
                          title=""
                          value="1.25"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 125 }'
                        >
                          125%
                        </option>
                        <option
                          title=""
                          value="1.5"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 150 }'
                        >
                          150%
                        </option>
                        <option
                          title=""
                          value="2"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 200 }'
                        >
                          200%
                        </option>
                        <option
                          title=""
                          value="3"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 300 }'
                        >
                          300%
                        </option>
                        <option
                          title=""
                          value="4"
                          data-l10n-id="page_scale_percent"
                          data-l10n-args='{ "scale": 400 }'
                        >
                          400%
                        </option>
                      </select>
                    </span>
                  </div>
                </div>
                <div id="loadingBar">
                  <div className="progress">
                    <div className="glimmer"></div>
                  </div>
                </div>
              </div>
            </div>
            <menu type="context" id="viewerContextMenu">
              <menuitem
                id="contextFirstPage"
                label="First Page"
                data-l10n-id="first_page"
              ></menuitem>
              <menuitem
                id="contextLastPage"
                label="Last Page"
                data-l10n-id="last_page"
              ></menuitem>
              <menuitem
                id="contextPageRotateCw"
                label="Rotate Clockwise"
                data-l10n-id="page_rotate_cw"
              ></menuitem>
              <menuitem
                id="contextPageRotateCcw"
                label="Rotate Counter-Clockwise"
                data-l10n-id="page_rotate_ccw"
              ></menuitem>
            </menu>

            <div id="viewerContainer" ref={this.viewerContainer}>
              <div id="viewer" ref={this.viewer} className="pdfViewer" />
            </div>

            <div id="errorWrapper" hidden={true}>
              <div id="errorMessageLeft">
                <span id="errorMessage"></span>
                <button id="errorShowMore" data-l10n-id="error_more_info">
                  More Information
                </button>
                <button
                  id="errorShowLess"
                  data-l10n-id="error_less_info"
                  hidden={true}
                >
                  Less Information
                </button>
              </div>
              <div id="errorMessageRight">
                <button id="errorClose" data-l10n-id="error_close">
                  Close
                </button>
              </div>
              <div className="clearBoth" />
              <textarea id="errorMoreInfo" hidden={true} readOnly="readonly" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PdfFrame;
