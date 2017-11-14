import * as utils from './utils';
export interface IColorBlockOptions {
  width: number;
  height: number;
  lineWidth?: number;
  onColorChange?(pixel: ImageData): void;
}

export class ColorBlock {
  private _padding: number = 10;
  private _el: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _contentWidth: number;
  private _contentHeight: number;
  private _activeColor: string;
  private _x: number;
  private _y: number;
  private _white: CanvasGradient;
  private _black: CanvasGradient;
  private _mouseDown: boolean = false;

  private _options: IColorBlockOptions;

  constructor(element: HTMLCanvasElement, options?: IColorBlockOptions) {
    const _options: IColorBlockOptions = {
      width: null,
      height: null,
      lineWidth: 1,
      onColorChange: null
    };

    if (options) {
      Object.assign(_options, options);
    }

    this._options = _options;

    this._el = element;

    this.init();
  }

  private init() {
    const padding = this._padding;

    const canvas = this._el,
      ctx = canvas.getContext('2d');

    const { width, height, lineWidth } = this._options;

    const contentWidth = width - padding * 2,
      contentHeight = height - padding * 2;

    canvas.setAttribute('width', width.toString());

    canvas.setAttribute('height', height.toString());

    ctx.lineWidth = lineWidth;

    this._ctx = ctx;
    this._width = width;
    this._height = height;
    this._contentWidth = contentWidth;
    this._contentHeight = contentHeight;
    this._x = width / 2;
    this._y = height / 2;

    canvas.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        this._mouseDown = true;
        this.setCoordinateByEvent(e);
        canvas.addEventListener('mousemove', this.handleMouseMove);
      }
    });

    // 全局监听mouseup，避免拖出元素后事件仍然存在
    document.addEventListener('mouseup', (e) => {
      if (this._mouseDown && e.which === 1) {
        this._mouseDown = false;
        canvas.removeEventListener('mousemove', this.handleMouseMove);
      }
    });

    this.initBackground();

    this.draw();
  }

  private initBackground() {
    const { _ctx, _padding, _width, _height, _activeColor } = this;

    const black = _ctx.createLinearGradient(_width / 2, _height - _padding, _width / 2, _padding);

    const white = _ctx.createLinearGradient(_padding, _height / 2, _width - _padding, _height / 2);

    white.addColorStop(0, '#fff');

    white.addColorStop(1, 'rgba(0,0,0,0)');

    black.addColorStop(0, '#000');

    black.addColorStop(1, 'rgba(0,0,0,0)');

    this._white = white;

    this._black = black;
  }

  // 填充背景色（拾色器）
  private fillColor() {
    const { _ctx, _padding, _contentWidth, _contentHeight, _activeColor } = this;

    if (!_activeColor) {
      return;
    }

    // 填充底色
    _ctx.save();

    _ctx.fillStyle = _activeColor;

    _ctx.fillRect(_padding, _padding, _contentWidth, _contentHeight);

    _ctx.restore();

    // 填充黑白背景
    [this._white, this._black].forEach(gradient => {
      _ctx.fillStyle = gradient;

      _ctx.fillRect(_padding, _padding, _contentWidth, _contentHeight);

      _ctx.restore();
    });
  }

  private setCoordinateByEvent = (e: MouseEvent) => {
    this.setCoordinate(e.layerX, e.layerY);
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (e.which === 1) {
      this.setCoordinateByEvent(e);
    }
  }

  // 设置坐标
  private setCoordinate(x: number, y: number) {
    const padding = this._padding;
    let currentX, currentY;
    // 检查边界
    if (x < padding) {
      currentX = padding + 1;
    } else if (x > this._contentWidth + padding) {
      currentX = this._contentWidth + padding - 1;
    } else {
      currentX = x;
    }

    if (y < padding) {
      currentY = padding + 1;
    } else if (y > this._contentHeight + padding) {
      currentY = this._contentHeight + padding - 1;
    } else {
      currentY = y;
    }

    this._x = currentX;
    this._y = currentY;

    this.draw();
  }

  // 渲染光标
  private renderPointer() {
    const x = this._x,
      y = this._y;

    if (x !== undefined && y !== undefined) {
      const ctx = this._ctx;

      ctx.save();

      ctx.strokeStyle = '#000';
      ctx.beginPath();
      ctx.arc(x, y, this._padding / 2, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.restore();

      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, this._padding / 2 - this._options.lineWidth, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.restore();
    }
  }

  public draw() {
    const { _ctx, _width, _height, _x, _y } = this;

    _ctx.clearRect(0, 0, _width, _height);

    this.fillColor();

    this.renderPointer();

    // 颜色变化后的回调
    if (this._options.onColorChange) {
      const pixel = _ctx.getImageData(_x, _y, 1, 1);
      this._options.onColorChange(pixel);
    }
  }

  set color(color: string) {
    this._activeColor = color;
    this.draw();
  }

  /* set currentColor(color: string) {
    const x = Math.round(this._width / 2) - 1,
      y = Math.round(this._height / 2) - 1;

    const ctx = this._ctx;
    this._activeColor = color;
    this.draw();

    // 正中间不一定是设置的颜色,遍历附近的像素点找到颜色相同的像素点
    const closestPixel = [];
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        closestPixel.push({ x: x + a, y: y + b });
      }
    }

    for (let p of closestPixel) {
      const hex = '#' + utils.Rgb2Hex(utils.ImageData2Rgb(ctx.getImageData(p.x, p.y, 1, 1)));
      if (hex === color) {
        this._x = p.x;
        this._y = p.y;
        this.draw();
        return;
      }
    }

    this._x = x + 1;
    this._y = y + 1;
    this.draw();
  } */
}
