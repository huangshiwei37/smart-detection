import React from 'react';

const Rank = ({name, rank}) => {
	return(
		<div>
			<p className="f4 white mt4 mb2" style={{textAlign: 'center'}}>
				{"Hi " + name + ", your current rank is"}
			</p>
			<p className="f3 orange mt2 mb0" style={{textAlign: 'center'}}>#{rank}</p>
		</div>
	);
}

export default Rank;