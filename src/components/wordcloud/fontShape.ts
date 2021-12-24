const defaultConfig = {
  direction: "ltr",
  fillStyle: "#000000",
  filter: "none",
  font: "900px sans-serif",
  strokeStyle: "#000000",
  textAlign: "start",
  textBaseline: "alphabetic"
};

interface IFont {
  text: string,
  font?: string,
  x?: number,
  y?: number;
}

function drawText(ctx, config: IFont){
  let {text, font, x = 0, y = 800} = config;
  ctx.font = font || defaultConfig.font;
  for (const key in defaultConfig) {
    ctx[key] = config[key] || defaultConfig[key];
  }
  ctx.fillText(text, x, y);
}

export default function (config: IFont | Array<IFont>, width = 900, height = 900) {
  let canvas = <HTMLCanvasElement>document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');

  if (config instanceof Array) {
    for (let c of config) {
      drawText(ctx, c);
    }
  } else {
    drawText(ctx, config);
  }

  return canvas.toDataURL('image/png', 1)
};
