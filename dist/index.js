"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blookifyImage = blookifyImage;
const sharp_1 = __importDefault(require("sharp"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function blookifyImage(imageBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const BLOOK_MASK_IMAGE_PATH = path.resolve(__dirname, './assets/mask.png');
        const BLOOK_OVERLAY_IMAGE_PATH = path.resolve(__dirname, './assets/overlay.png');
        const BLOOK_MASK_IMAGE = yield fs.promises.readFile(BLOOK_MASK_IMAGE_PATH);
        const BLOOK_OVERLAY_IMAGE = yield fs.promises.readFile(BLOOK_OVERLAY_IMAGE_PATH);
        const mask = yield (0, sharp_1.default)(BLOOK_MASK_IMAGE)
            .png()
            .toBuffer();
        const overlay = yield (0, sharp_1.default)(BLOOK_OVERLAY_IMAGE)
            .png()
            .toBuffer();
        const image = yield (0, sharp_1.default)(imageBuffer)
            .ensureAlpha()
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .resize(300, 300)
            .png()
            .toBuffer();
        const compositeImage = yield (0, sharp_1.default)({
            create: {
                width: 300,
                height: 345,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
            .composite([{ input: image, top: 45, left: 0 }])
            .png()
            .toBuffer();
        const maskedImage = yield (0, sharp_1.default)(compositeImage)
            .composite([{ input: mask, blend: 'dest-out' }])
            .png()
            .toBuffer();
        const finalImage = yield (0, sharp_1.default)(maskedImage)
            .composite([{ input: overlay, blend: 'multiply' }])
            .webp({ quality: 90 })
            .toBuffer();
        return finalImage;
    });
}
//# sourceMappingURL=index.js.map