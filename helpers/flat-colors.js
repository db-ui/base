const getOnHeader = (header) => {
	const splitHeader = header.split('-');
	splitHeader.splice(1, 0, 'on');
	return splitHeader.filter((part) => Number.isNaN(Number(part))).join('-');
};

const colorStates = ['enabled', 'hover', 'pressed'];

const isDefaultChild = (key) => {
	return colorStates.includes(key) || key === 'on';
};

const addListElement = (header, value) => {
	return `
<!-- TODO: Make this clickable with copy to clipboard-->
	<li>
		<div class="sg-swatch" style="background: ${value?.background};">
			<span class="sg-label" style="color: ${
				value?.foreground || 'rgb(236, 0, 22)'
			};">
				<strong>${getOnHeader(header)}-${value.foregroundKey}</strong>
				<br />
				${value?.foreground || 'not available'}
				${
					value?.weak
						? `<br /><br /><strong>${getOnHeader(header)}-weak-${
								value.foregroundKey
						  }</strong><br />${value?.weak}`
						: ''
				}
			</span>
		</div>
		<span class="sg-label" style="color: ${
			value?.background ? 'inherit' : 'rgb(236, 0, 22)'
		};">
			<strong>${header}-${value.backgroundKey}</strong>
			<br />
			${value?.background || 'not available'}
		</span>
	</li>
	`;
};

const getTryoutElement = (
	colorObject,
	defaultBackground,
	defaultForeground,
	isBackground
) => {
	const stateElement = isBackground ? 'backgroundColor' : 'color';
	return `<li>
				<div class="sg-swatch"
				onmousedown="this.style['${stateElement}']='${
		colorObject[colorStates[2]].value
	}'"
				onmouseup="this.style['${stateElement}']='${colorObject[colorStates[1]].value}'"
				onmouseover="this.style['${stateElement}']='${
		colorObject[colorStates[1]].value
	}'"
				onmouseout="this.style['${stateElement}']='${
		colorObject[colorStates[0]].value
	}'"
				style="background-color: ${
					isBackground
						? colorObject[colorStates[0]].value
						: defaultBackground
				};
				color: ${isBackground ? defaultForeground : colorObject[colorStates[0]].value};"
				>
					<span class="sg-label">
						<strong>My ${isBackground ? 'background' : 'foreground'}</strong>
						<br />
						<span>is interactive!</span>
					</span>
				</div>
				<strong class="sg-label">Try me: ${
					isBackground ? 'background' : 'foreground'
				} interactive</strong>
			</li>`;
};

const addList = (header, headerObject, keys) => {
	let resultString = '';

	let defaultForeground;
	const defaultBackground = headerObject[colorStates[0]]?.value;
	let onObject;

	if (keys.includes('on')) {
		onObject = headerObject.on;
		defaultForeground = onObject[colorStates[0]]?.value;
	}

	if (defaultBackground) {
		resultString += `<strong>${header} background interactive</strong>`;
		resultString += `<ul class="sg-colors">`;
		for (let i = 0; i < 3; i++) {
			const state = colorStates[i];
			if (headerObject[state]) {
				resultString += addListElement(header, {
					backgroundKey: state,
					background: headerObject[state].value,
					foregroundKey: colorStates[0],
					foreground: defaultForeground
				});
			}
		}

		resultString += getTryoutElement(
			headerObject,
			defaultBackground,
			defaultForeground,
			true
		);
		resultString += `</ul>`;
	}

	if (onObject) {
		resultString += `<strong>${header} foreground interactive</strong>`;
		resultString += `<ul class="sg-colors">`;
		for (let i = 0; i < 3; i++) {
			const state = colorStates[i];
			if (onObject[state]) {
				resultString += addListElement(header, {
					backgroundKey: colorStates[0],
					background: defaultBackground,
					foregroundKey: state,
					foreground: onObject[state].value,
					weak: onObject.weak?.[state]?.value
				});
			}
		}

		resultString += getTryoutElement(
			onObject,
			defaultBackground,
			defaultForeground,
			false
		);
		resultString += `</ul>`;
	}

	return resultString;
};

module.exports = function (Handlebars) {
	Handlebars.registerHelper('flat-colors', function (context) {
		let resultString = '';

		for (const header of Object.keys(context.data.root.colors)) {
			resultString += `<h2>${header}</h2>`; // E.g. neutral, primary
			const headerObject = context.data.root.colors[header];
			if (headerObject) {
				const headerObjectKeysRest = Object.keys(headerObject).filter(
					(k) => k !== 'bg'
				);
				// Neutral has no enabled color
				if (context.data.root.colors[header].enabled) {
					resultString += addList(
						header,
						headerObject,
						headerObjectKeysRest
					);
				}

				const onBgObject = headerObject.on;
				const bgObject = headerObject.bg;
				if (bgObject) {
					let bgKeys = Object.keys(bgObject);
					if (onBgObject.bg) {
						if (bgKeys.some((key) => key.includes('enabled'))) {
							bgObject.on = onBgObject.bg;
						} else {
							// Only happens in neutral colors
							for (const bgKey of bgKeys) {
								if (
									Object.keys(bgObject[bgKey]).some((key) =>
										key.includes('enabled')
									)
								) {
									bgObject[bgKey] = {
										...bgObject[bgKey],
										on: onBgObject.bg
									};
								} else {
									for (const bgChildKey of Object.keys(
										bgObject[bgKey]
									)) {
										bgObject[`${bgKey}-${bgChildKey}`] = {
											...bgObject[bgKey][bgChildKey],
											on: onBgObject.bg
										};
									}
								}
							}
						}
					}

					bgKeys = Object.keys(bgObject);
					const defaultChildren = bgKeys.filter((key) =>
						isDefaultChild(key)
					);
					const otherChildren = bgKeys.filter(
						(key) => !isDefaultChild(key)
					);
					resultString += `<h3>${header} backgrounds</h3>`;
					resultString += addList(
						`${header}-bg`,
						bgObject,
						defaultChildren
					);
					for (const bgChildKey of otherChildren) {
						const bgChildObject = bgObject[bgChildKey];
						resultString += addList(
							`${header}-bg-${bgChildKey}`,
							bgChildObject,
							Object.keys(bgChildObject)
						);
					}
				}
			}
		}

		return new Handlebars.SafeString(resultString);
	});
};
