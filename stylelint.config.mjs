export default {
    extends: ['stylelint-config-standard-scss'],
    rules: {
        // BEM class names: block, block__element, block--modifier
        'selector-class-pattern': [
            '^[a-z][a-z0-9-]*(__[a-z0-9][a-z0-9-]*)?(--[a-z0-9][a-z0-9-]*)?$',
            {
                message: 'Expected BEM class name: block, block__element, or block--modifier',
            },
        ],
        // Allow lowerCamel mixin names (onDesktop, onTablet, onMobile)
        'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9-]*$',
    },
    overrides: [
        {
            // CSS resets intentionally use legacy selectors/properties
            files: ['src/shared/styles/_reset.scss'],
            rules: {
                'selector-no-deprecated': null,
                'declaration-block-no-shorthand-property-overrides': null,
                'comment-empty-line-before': null,
                'rule-empty-line-before': null,
            },
        },
    ],
}
