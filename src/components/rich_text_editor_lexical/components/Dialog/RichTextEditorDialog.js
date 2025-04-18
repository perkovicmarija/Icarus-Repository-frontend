

import './RichTextEditorDialog.css';


export function RichTextEditorDialogButtonsList({children}) {
  return <div className="DialogButtonsList">{children}</div>;
}

export function RichTextEditorDialogActions({
                                'data-test-id': dataTestId,
                                children,
                              }) {
  return (
    <div className="DialogActions" data-test-id={dataTestId}>
      {children}
    </div>
  );
}