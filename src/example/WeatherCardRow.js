import React from 'react';

export default ({ icon, children, ...restProps }) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			paddingLeft: 80,
			paddingRight: 80,
			paddingBottom: 20
		}}
		{...restProps}
	>
		{icon}
		<div>{children}</div>
	</div>
);
