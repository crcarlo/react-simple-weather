import React from 'react';

export default ({ icon, children, ...restProps }) => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			width: 260,
			paddingBottom: 20
		}}
		{...restProps}
	>
		{icon}
		<div>{children}</div>
	</div>
);
