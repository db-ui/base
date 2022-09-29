const fs = require('fs');
const colors = require('../tokens/zeplin.json');

const prefix = 'db';

const generateInteractiveVariants = (currentColorObj, cssProp) => {
	return `
        &:hover {
            ${cssProp}: $${prefix}-${currentColorObj.hover.name};
        }

        &:active {
            ${cssProp}: $${prefix}-${currentColorObj.pressed.name};
        }
        `;
};

const generateNeutralVariants = (
	value,
	index,
	currentColorObj,
	baseColorObj
) => {
	return `
%${prefix}-bg-${value}-${index},
.${prefix}-bg-${value}-${index} {    
    background-color: $${prefix}-${currentColorObj.enabled.name};
    color: $${prefix}-${baseColorObj.enabled.name};

    &-ia,
    &[data-variant="ia"] {
        ${generateInteractiveVariants(currentColorObj, 'background-color')}
    }

    &-text-ia,
    &[data-variant="text-ia"] {
         ${generateInteractiveVariants(baseColorObj, 'color')}
    }

    .db-text-weak {
        color: $${prefix}-${baseColorObj.weak.enabled.name};

        &-ia,
        &[data-variant="ia"] {
            ${generateInteractiveVariants(baseColorObj.weak, 'color')}
        }
    }
}
`;
};

exports.generateColorUtilitityClasses = (colorToken) => {
	//let colors2JSON = JSON.parse(JSON.stringify(colors)).colors;
	//console.log('geladene Farben: ', colors, colors2JSON.primary);
	console.log('generate Color Utlities', colorToken);
	let output = '';

	Object.keys(colorToken).forEach((value, index) => {
		output += `/**
* ${value.toUpperCase()} - Utilities          
**/
`;
		// text colors
		output += `%${prefix}-text-${value}, 
.${prefix}-text-${value} {
    color: $${prefix}-${colorToken[value].enabled.name};
}
`;
		// text and background colors
		output += `
%${prefix}-bg-${value},
.${prefix}-bg-${value} {
    background-color: $${prefix}-${colorToken[value].enabled.name};
    color: $${prefix}-${colorToken[value].on.enabled.name};

    &-ia,
    &[data-variant="ia"] {
        ${generateInteractiveVariants(colorToken[value], 'background-color')}
    }

    &-text-ia,
    &[data-variant="text-ia"] {
         ${generateInteractiveVariants(colorToken[value].on, 'color')}
    }
}`;

		// special case neutral has no default value for enabled
		if (colorToken[value].bg.enabled) {
			// weak variants
			output += `
%${prefix}-bg-${value}-light,
.${prefix}-bg-${value}-light {    
    background-color: $${prefix}-${colorToken[value].bg.enabled.name};
    color: $${prefix}-${colorToken[value].on.bg.enabled.name};

    &-ia,
    &[data-variant="ia"] {
        ${generateInteractiveVariants(colorToken[value].bg, 'background-color')}
    }

    &-text-ia,
    &[data-variant="text-ia"] {
         ${generateInteractiveVariants(colorToken[value].on.bg, 'color')}
    }

    .db-text-weak {
        color: $${prefix}-${colorToken[value].on.bg.weak.enabled.name};

        &-ia,
        &[data-variant="ia"] {
            ${generateInteractiveVariants(
				colorToken[value].on.bg.weak,
				'color'
			)}
        }
    }
}
`;
		} else {
			Object.keys(colorToken[value].bg).forEach((variant) => {
				output += generateNeutralVariants(
					value,
					variant,
					colorToken[value].bg[variant],
					colorToken[value].on.bg
				);
			});
		}
	});

	return output;
};
