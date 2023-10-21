export default function ConfirmMsg() {
  return (
    <div id="confirmMessage">
      <div className="msg">
        <p>Are You Sure You Want to Delete the budget ?</p>
        <div className="btns">
            <button className="btn btn--outline">
                Yes
            </button>
            <button className="btn btn--warning">
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
}
