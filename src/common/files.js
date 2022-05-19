export const getCompressedImg = async (file, maxWidth) => {
  if (!file) return "Error";
  let result = "";
  const fileType = file.type;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imgElem = document.createElement("img");
      imgElem.src = event.target.result;

      imgElem.onload = (ev) => {
        const canvast = document.createElement("canvas");
        const MAX_WIDTH = maxWidth || 880;
        const target = ev.target;
        const scaleSize = MAX_WIDTH / target.width;
        canvast.width = MAX_WIDTH;
        canvast.height = target.height * scaleSize;
        const ctx = canvast.getContext("2d");
        ctx.drawImage(target, 0, 0, canvast.width, canvast.height);
        result = ctx.canvas.toDataURL(target, fileType);
        resolve(result);
      };
      imgElem.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};
