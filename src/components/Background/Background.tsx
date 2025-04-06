import React from 'react'
import './background.scss'

const Main: React.FC = () => {
	return (
		<div className='background'>
			<div className='blurred-spot spot1'></div>
			<div className='blurred-spot spot2'></div>
		</div>
	)
}

export default Main
