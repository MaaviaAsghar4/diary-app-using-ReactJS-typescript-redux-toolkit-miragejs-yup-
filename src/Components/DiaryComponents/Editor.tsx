import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCanEdit } from "../../Features/Entry/editorSlice";
import { Entry } from "../../Interface/type";
import { RootState } from "../../RootReducer";
import { useAppDispatch } from "../../store";

const Editor = () => {
  const { activeDiaryId, canEdit, currentlyEditing } = useSelector(
    (state: RootState) => state.editor
  );
  let [editedEntry, updateEditedEntry] = useState(currentlyEditing);
  const dispatch = useAppDispatch();
  return (
    <div style={{ width: "75vw" }}>
      <div className="mr-3 mt-5" style={{ width: "70vw" }}>
        {!canEdit ? (
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label
                className="mb-0"
                style={{ fontSize: "0.9rem", fontWeight: "bold" }}
              >
                Title
              </Form.Label>
              <Form.Control
                value={editedEntry?.title}
                onChange={(e) => {
                  if (editedEntry) {
                    updateEditedEntry({
                      ...editedEntry,
                      title: e.target.value,
                    });
                  }
                }}
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>
          </Form>
        ) : (
          <div className="d-flex align-items-center justify-content-around">
            currentlyEditing && <span>{currentlyEditing?.title}</span>
            <span
              onClick={() => {
                if (currentlyEditing !== null) {
                  dispatch(setCanEdit(true));
                }
              }}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              (Edit)
            </span>
          </div>
        )}
      </div>
      <div className="mr-3" style={{ width: "70vw" }}>
        {!canEdit ? (
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label
                className="mb-0"
                style={{ fontSize: "0.9rem", fontWeight: "bold" }}
              >
                Content
              </Form.Label>
              <Form.Text className="text-muted">Markdown Supported</Form.Text>
              <Form.Control
                placeholder="Enter Content"
                style={{ resize: "none" }}
                as="textarea"
                rows={10}
                onChange={(e) => {
                  if (editedEntry) {
                    updateEditedEntry({
                      ...editedEntry,
                      content: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Form>
        ) : (
          currentlyEditing && <Markdown>{currentlyEditing?.content}</Markdown>
        )}
      </div>
      <div className="text-center">
        <Button variant="primary" type="submit">
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default Editor;
