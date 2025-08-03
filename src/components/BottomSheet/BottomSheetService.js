// BottomSheetService.js
let callback = null;

const BottomSheetService = {
  setCallback(fn) {
    callback = fn;
  },
  getCallback() {
    return callback;
  },
  clearCallback() {
    callback = null;
  },
};

export default BottomSheetService;