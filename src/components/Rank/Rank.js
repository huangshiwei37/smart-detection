import React from 'react';

const Rank = ({name, rank}) => {
	return(
		<div>
			<p className="f3 white ma2" style={{textAlign: 'center'}}>
				{"Hi " + name + ", your current rank is"}
			</p>
			<p className="f2 white ma2" style={{textAlign: 'center'}}>#{rank}</p>
		</div>
	);
}

export default Rank;