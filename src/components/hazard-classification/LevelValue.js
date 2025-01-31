import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Add,
  ChevronRight,
  Delete,
  Edit,
  ExpandMore,
  Remove,
} from "@mui/icons-material";

function LevelValue({
  value,
  values,
  onSelected,
  selectedValue,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(value.isDefaultOpen);

  return (
    <>
      {value.name && (
        <div
          className="tree-node"
          style={{
            marginInlineStart: (value.level - 1) * 20 + "px",
            backgroundColor:
              selectedValue && selectedValue.taxonomyId === value.taxonomyId
                ? "#E2C675"
                : "",
            display: "flex",
          }}
        >
          {value.hasChild ? (
            <IconButton
              style={{ padding: 0 }}
              aria-label="Delete"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          ) : (
            <IconButton style={{ padding: 0 }} disabled>
              <Remove />
            </IconButton>
          )}

          <div
            style={{
              flexGrow: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={(event) => onSelected(event, value)}
          >
            <span>{`${value.name} ${value.count ? ` (count: ${value.count})` : ""}`}</span>

            {(isOpen || !value.hasChild) && (
              <>
                {onAdd && (
                  <IconButton
                    style={{ padding: 0, marginLeft: "0.5rem" }}
                    color="primary"
                    onClick={() =>
                      onAdd({
                        parentId: value.taxonomyId,
                      })
                    }
                  >
                    <Add />
                  </IconButton>
                )}
                {onEdit && (
                  <IconButton
                    style={{ padding: 0, marginLeft: "0.5rem" }}
                    color="primary"
                    onClick={() => onEdit(value)}
                  >
                    <Edit />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton
                    style={{ padding: 0, marginLeft: "0.5rem", color: "red" }}
                    onClick={() => onDelete(value)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {isOpen &&
        values
          .filter((s) => s.parentId === value.taxonomyId)
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((valueChild) => (
            <React.Fragment key={valueChild.taxonomyId}>
              <LevelValue
                onSelected={onSelected}
                value={valueChild}
                selectedValue={selectedValue}
                values={values}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </React.Fragment>
          ))}
    </>
  );
}

export default LevelValue;
