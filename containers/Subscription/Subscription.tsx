import React from 'react';
import ProgressBar from '@/component/progressbar/progressbar';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

const Subscription = () => {
	return (
		<div className="w-100" >

			<div className="mt-4" >
				<ProgressBar
					status="normal"
					percent={90}
					strokeColor="#8DA6FF"
					showInfo={false}
					title="Basic Services"
					data="65,376"
				/>
			</div>

			<div className="mt-2" >
				<ProgressBar
					status="normal"
					percent={70}
					strokeColor="#FF95B5"
					showInfo={false}
					title="E-Accounting"
					data="12,109"
				/>
			</div>

			<div className="mt-2" >
				<ProgressBar
					status="normal"
					percent={70}
					strokeColor="#FEF072"
					showInfo={false}
					title="Professional Plan"
					data="132,645"
				/>
			</div>

			<div className="mt-2" >
				<ProgressBar
					status="normal"
					percent={70}
					strokeColor="#AEF5C2"
					showInfo={false}
					title="Customized Plans"
					data="100,429"
				/>
			</div>

			<div className="mt-2" >
				<ButtonSimple title="View More" type="voilet" />
			</div>

		</div>
	);
}

export default Subscription;