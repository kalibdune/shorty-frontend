import React from 'react'
import QRCode from '../QRCode/QRCode'
import { QRCodeProps } from '../QRCode/QRCode'

interface QRPopupProps extends Omit<QRCodeProps, 'visibility'> {
	hashCode: string
}

const QRPopup: React.FC<QRPopupProps> = ({ url, hashCode }) => {
	return (
		<>
			<p className='title'>{hashCode}</p>
			<QRCode url={url} visibility={true} size={400}></QRCode>
		</>
	)
}

export default QRPopup
