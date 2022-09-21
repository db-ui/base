const addListElement = (header, key, value) => {
	return `
<!-- TODO: Make this clickable with copy to clipboard-->
	<li>
		<div class="sg-swatch" style="background: ${value?.background};">
			<span class="sg-label" style="color: ${
				value?.foreground || 'rgb(236, 0, 22)'
			};">
				<strong>on</strong>-${header}-${key}
				<br />
				${value?.foreground || 'not available'}
			</span>
		</div>
		<span class="sg-label" style="color: ${
			value?.background ? 'inherit' : 'rgb(236, 0, 22)'
		};">
			${header}-${key}
			<br />
			${value?.background || 'not available'}
		</span>
	</li>
	`;
};

const addList = (header, headerObject, keys) => {
	let resultString = `<ul class="sg-colors">`;

	const listElements = {};

	keys.forEach((key) => {
		if (key === 'on') {
			const onObject = headerObject['on'];
			Object.keys(onObject).forEach((onKey) => {
				listElements[onKey] = {
					...listElements[onKey],
					foreground: onObject[onKey]?.value
						? onObject[onKey].value
						: 'error'
				};
			});
		} else {
			listElements[key] = {
				...listElements[key],
				background: headerObject[key]?.value
					? headerObject[key].value
					: 'error'
			};
		}
	});

	Object.keys(listElements).forEach((key) => {
		resultString += addListElement(header, key, listElements[key]);
	});

	resultString += `</ul>`;
	return resultString;
};

const isDefaultChild = (key) => {
	return (
		key === 'enabled' ||
		key === 'hover' ||
		key === 'pressed' ||
		key === 'on'
	);
};

module.exports = function (Handlebars) {
	Handlebars.registerHelper('flat-colors', function (context) {
		let resultString = '';

		Object.keys(context.data.root.colors).forEach((header) => {
			resultString += `<h2>${header}</h2>`;
			const headerObject = context.data.root.colors[header];
			if (headerObject) {
				const headerObjKeysRest = Object.keys(headerObject).filter(
					(k) => k !== 'bg'
				);
				resultString += addList(
					header,
					headerObject,
					headerObjKeysRest
				);
				const bgObject = headerObject['bg'];
				if (bgObject) {
					const bgKeys = Object.keys(bgObject);
					const defaultChildren = bgKeys.filter(isDefaultChild);
					const otherChildren = bgKeys.filter(
						(key) => !isDefaultChild(key)
					);
					resultString += `<h3>${header}-backgrounds-only</h3>`;
					resultString += addList(
						`${header}-bg`,
						bgObject,
						defaultChildren
					);
					otherChildren.forEach((bgChildKey) => {
						const bgChildObject = bgObject[bgChildKey];
						resultString += addList(
							`${header}-bg-${bgChildKey}`,
							bgChildObject,
							Object.keys(bgChildObject)
						);
					});
				}
			}
		});

		return new Handlebars.SafeString(resultString);
	});
};
