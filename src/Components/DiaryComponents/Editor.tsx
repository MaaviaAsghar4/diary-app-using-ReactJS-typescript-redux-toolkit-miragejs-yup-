import Markdown from "markdown-to-jsx";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateDiary } from "../../Features/Diary/diarySlice";
import {
  setCanEdit,
  setCurrentlyEditing,
} from "../../Features/Entry/editorSlice";
import { updateEntry } from "../../Features/Entry/entrySlice";
import { Diary, Entry } from "../../Interface/type";
import { RootState } from "../../RootReducer";
import http from "../../Service/api";
import { useAppDispatch } from "../../store";
import { showAlert } from "../../util";

const Editor = () => {
  const { activeDiaryId, canEdit, currentlyEditing: entry } = useSelector(
    (state: RootState) => state.editor
  );
  let [editedEntry, updateEditedEntry] = useState(entry);
  const dispatch = useAppDispatch();

  const saveEntry = async (e: any) => {
    e.preventDefault();
    if (activeDiaryId == null) {
      return showAlert("Please select a diary", "warning");
    }
    if (entry == null) {
      http
        .post<Entry, { diary: Diary; entry: Entry }>(
          `/diaries/entry/${activeDiaryId}`,
          editedEntry
        )
        .then((res) => {
          if (res != null) {
            const { diary, entry: _entry } = res;
            dispatch(setCurrentlyEditing(_entry));
            dispatch(updateDiary(diary));
          }
        });
    } else {
      http
        .put<Entry, Entry>(`/diaries/entry/${entry?.id}`, editedEntry)
        .then((res) => {
          if (res != null) {
            dispatch(setCurrentlyEditing(res));
            dispatch(updateEntry(res));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedEntry(entry);
  }, [entry]);
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
                  console.log(e.target.value);
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
            entry && <span>{entry?.title}</span>
            <span
              onClick={() => {
                if (entry !== null) {
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
                value={editedEntry?.content}
                onChange={(e) => {
                  console.log(e.target.value);
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
          entry && <Markdown>{entry?.content}</Markdown>
        )}
      </div>
      <div className="text-center">
        <Button onClick={saveEntry} variant="primary" type="submit">
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default Editor;
