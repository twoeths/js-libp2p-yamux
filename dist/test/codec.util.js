import { CodeError } from '@libp2p/interface';
import { ERR_DECODE_INVALID_VERSION } from '../src/constants.js';
import { HEADER_LENGTH, YAMUX_VERSION } from '../src/frame.js';
// Slower encode / decode functions that use dataview
export function decodeHeaderNaive(data) {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    if (view.getUint8(0) !== YAMUX_VERSION) {
        throw new CodeError('Invalid frame version', ERR_DECODE_INVALID_VERSION);
    }
    return {
        type: view.getUint8(1),
        flag: view.getUint16(2, false),
        streamID: view.getUint32(4, false),
        length: view.getUint32(8, false)
    };
}
export function encodeHeaderNaive(header) {
    const frame = new Uint8Array(HEADER_LENGTH);
    const frameView = new DataView(frame.buffer, frame.byteOffset, frame.byteLength);
    // always assume version 0
    // frameView.setUint8(0, header.version)
    frameView.setUint8(1, header.type);
    frameView.setUint16(2, header.flag, false);
    frameView.setUint32(4, header.streamID, false);
    frameView.setUint32(8, header.length, false);
    return frame;
}
//# sourceMappingURL=codec.util.js.map