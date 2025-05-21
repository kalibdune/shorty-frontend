import React from 'react';
import QRCodeReact from 'react-qr-code';
import './QRCode.scss';

interface QRCodeProps {
    url: string
    size?: number
    visibility: boolean
}

const QRCode: React.FC<QRCodeProps> = ({ url, size = 200, visibility }) => {
    return (
        <div className="qrCodeContainer" style={{ display: visibility ? "block" : "none" }}>
            <div className="qrCodeWrapper">
                <QRCodeReact
                    value={url}
                    size={size}
                    fgColor="rgba(110, 0, 245, 0.6)"
                    bgColor="transparent"
                    level="H"
                    className="qrCode"
                />
            </div>
        </div>
    );
};

export default QRCode;
export type { QRCodeProps }