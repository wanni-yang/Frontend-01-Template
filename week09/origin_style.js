Object.keys(document.getElementsByTagName('body')[0].style);
var result = [
    "alignContent",
    "alignItems",
    "alignSelf",
    "alignmentBaseline",
    "all",
    "animation",
    "animationDelay",
    "animationDirection",
    "animationDuration",
    "animationFillMode",
    "animationIterationCount",
    "animationName",
    "animationPlayState",
    "animationTimingFunction",
    "backdropFilter",
    "backfaceVisibility",
    "background",
    "backgroundAttachment",
    "backgroundBlendMode",
    "backgroundClip",
    "backgroundColor",
    "backgroundImage",
    "backgroundOrigin",
    "backgroundPosition",
    "backgroundPositionX",
    "backgroundPositionY",
    "backgroundRepeat",
    "backgroundRepeatX",
    "backgroundRepeatY",
    "backgroundSize",
    "baselineShift",
    "blockSize",
    "border",
    "borderBlock",
    "borderBlockColor",
    "borderBlockEnd",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth",
    "borderBlockStart",
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockStyle",
    "borderBlockWidth",
    "borderBottom",
    "borderBottomColor",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderBottomStyle",
    "borderBottomWidth",
    "borderCollapse",
    "borderColor",
    "borderImage",
    "borderImageOutset",
    "borderImageRepeat",
    "borderImageSlice",
    "borderImageSource",
    "borderImageWidth",
    "borderInline",
    "borderInlineColor",
    "borderInlineEnd",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth",
    "borderInlineStart",
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineStyle",
    "borderInlineWidth",
    "borderLeft",
    "borderLeftColor",
    "borderLeftStyle",
    "borderLeftWidth",
    "borderRadius",
    "borderRight",
    "borderRightColor",
    "borderRightStyle",
    "borderRightWidth",
    "borderSpacing",
    "borderStyle",
    "borderTop",
    "borderTopColor",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderTopStyle",
    "borderTopWidth",
    "borderWidth",
    "bottom",
    "boxShadow",
    "boxSizing",
    "breakAfter",
    "breakBefore",
    "breakInside",
    "bufferedRendering",
    "captionSide",
    "caretColor",
    "clear",
    "clip",
    "clipPath",
    "clipRule",
    "color",
    "colorInterpolation",
    "colorInterpolationFilters",
    "colorRendering",
    "colorScheme",
    "columnCount",
    "columnFill",
    "columnGap",
    "columnRule",
    "columnRuleColor",
    "columnRuleStyle",
    "columnRuleWidth",
    "columnSpan",
    "columnWidth",
    "columns",
    "contain",
    "containIntrinsicSize",
    "content",
    "counterIncrement",
    "counterReset",
    "cursor",
    "cx",
    "cy",
    "d",
    "direction",
    "display",
    "dominantBaseline",
    "emptyCells",
    "fill",
    "fillOpacity",
    "fillRule",
    "filter",
    "flex",
    "flexBasis",
    "flexDirection",
    "flexFlow",
    "flexGrow",
    "flexShrink",
    "flexWrap",
    "float",
    "floodColor",
    "floodOpacity",
    "font",
    "fontDisplay",
    "fontFamily",
    "fontFeatureSettings",
    "fontKerning",
    "fontOpticalSizing",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontVariant",
    "fontVariantCaps",
    "fontVariantEastAsian",
    "fontVariantLigatures",
    "fontVariantNumeric",
    "fontVariationSettings",
    "fontWeight",
    "gap",
    "grid",
    "gridArea",
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnGap",
    "gridColumnStart",
    "gridGap",
    "gridRow",
    "gridRowEnd",
    "gridRowGap",
    "gridRowStart",
    "gridTemplate",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
    "height",
    "hyphens",
    "imageOrientation",
    "imageRendering",
    "inlineSize",
    "inset",
    "insetBlock",
    "insetBlockEnd",
    "insetBlockStart",
    "insetInline",
    "insetInlineEnd",
    "insetInlineStart",
    "isolation",
    "justifyContent",
    "justifyItems",
    "justifySelf",
    "left",
    "letterSpacing",
    "lightingColor",
    "lineBreak",
    "lineHeight",
    "lineHeightStep",
    "listStyle",
    "listStyleImage",
    "listStylePosition",
    "listStyleType",
    "margin",
    "marginBlock",
    "marginBlockEnd",
    "marginBlockStart",
    "marginBottom",
    "marginInline",
    "marginInlineEnd",
    "marginInlineStart",
    "marginLeft",
    "marginRight",
    "marginTop",
    "marker",
    "markerEnd",
    "markerMid",
    "markerStart",
    "mask",
    "maskSourceType",
    "maskType",
    "mathStyle",
    "maxBlockSize",
    "maxHeight",
    "maxInlineSize",
    "maxWidth",
    "maxZoom",
    "minBlockSize",
    "minHeight",
    "minInlineSize",
    "minWidth",
    "minZoom",
    "mixBlendMode",
    "objectFit",
    "objectPosition",
    "offset",
    "offsetAnchor",
    "offsetDistance",
    "offsetPath",
    "offsetPosition",
    "offsetRotate",
    "opacity",
    "order",
    "orientation",
    "orphans",
    "outline",
    "outlineColor",
    "outlineOffset",
    "outlineStyle",
    "outlineWidth",
    "overflow",
    "overflowAnchor",
    "overflowWrap",
    "overflowX",
    "overflowY",
    "overscrollBehavior",
    "overscrollBehaviorBlock",
    "overscrollBehaviorInline",
    "overscrollBehaviorX",
    "overscrollBehaviorY",
    "padding",
    "paddingBlock",
    "paddingBlockEnd",
    "paddingBlockStart",
    "paddingBottom",
    "paddingInline",
    "paddingInlineEnd",
    "paddingInlineStart",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "page",
    "pageBreakAfter",
    "pageBreakBefore",
    "pageBreakInside",
    "paintOrder",
    "perspective",
    "perspectiveOrigin",
    "placeContent",
    "placeItems",
    "placeSelf",
    "pointerEvents",
    "position",
    "quotes",
    "r",
    "resize",
    "right",
    "rotate",
    "rowGap",
    "rx",
    "ry",
    "scale",
    "scrollBehavior",
    "scrollMargin",
    "scrollMarginBlock",
    "scrollMarginBlockEnd",
    "scrollMarginBlockStart",
    "scrollMarginBottom",
    "scrollMarginInline",
    "scrollMarginInlineEnd",
    "scrollMarginInlineStart",
    "scrollMarginLeft",
    "scrollMarginRight",
    "scrollMarginTop",
    "scrollPadding",
    "scrollPaddingBlock",
    "scrollPaddingBlockEnd",
    "scrollPaddingBlockStart",
    "scrollPaddingBottom",
    "scrollPaddingInline",
    "scrollPaddingInlineEnd",
    "scrollPaddingInlineStart",
    "scrollPaddingLeft",
    "scrollPaddingRight",
    "scrollPaddingTop",
    "scrollSnapAlign",
    "scrollSnapStop",
    "scrollSnapType",
    "shapeImageThreshold",
    "shapeMargin",
    "shapeOutside",
    "shapeRendering",
    "size",
    "speak",
    "src",
    "stopColor",
    "stopOpacity",
    "stroke",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "subtreeVisibility",
    "tabSize",
    "tableLayout",
    "textAlign",
    "textAlignLast",
    "textAnchor",
    "textCombineUpright",
    "textDecoration",
    "textDecorationColor",
    "textDecorationLine",
    "textDecorationSkipInk",
    "textDecorationStyle",
    "textIndent",
    "textJustify",
    "textOrientation",
    "textOverflow",
    "textRendering",
    "textShadow",
    "textSizeAdjust",
    "textTransform",
    "textUnderlinePosition",
    "top",
    "touchAction",
    "transform",
    "transformBox",
    "transformOrigin",
    "transformStyle",
    "transition",
    "transitionDelay",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
    "translate",
    "unicodeBidi",
    "unicodeRange",
    "userSelect",
    "userZoom",
    "vectorEffect",
    "verticalAlign",
    "visibility",
    "webkitAlignContent",
    "webkitAlignItems",
    "webkitAlignSelf",
    "webkitAnimation",
    "webkitAnimationDelay",
    "webkitAnimationDirection",
    "webkitAnimationDuration",
    "webkitAnimationFillMode",
    "webkitAnimationIterationCount",
    "webkitAnimationName",
    "webkitAnimationPlayState",
    "webkitAnimationTimingFunction",
    "webkitAppRegion",
    "webkitAppearance",
    "webkitBackfaceVisibility",
    "webkitBackgroundClip",
    "webkitBackgroundOrigin",
    "webkitBackgroundSize",
    "webkitBorderAfter",
    "webkitBorderAfterColor",
    "webkitBorderAfterStyle",
    "webkitBorderAfterWidth",
    "webkitBorderBefore",
    "webkitBorderBeforeColor",
    "webkitBorderBeforeStyle",
    "webkitBorderBeforeWidth",
    "webkitBorderBottomLeftRadius",
    "webkitBorderBottomRightRadius",
    "webkitBorderEnd",
    "webkitBorderEndColor",
    "webkitBorderEndStyle",
    "webkitBorderEndWidth",
    "webkitBorderHorizontalSpacing",
    "webkitBorderImage",
    "webkitBorderRadius",
    "webkitBorderStart",
    "webkitBorderStartColor",
    "webkitBorderStartStyle",
    "webkitBorderStartWidth",
    "webkitBorderTopLeftRadius",
    "webkitBorderTopRightRadius",
    "webkitBorderVerticalSpacing",
    "webkitBoxAlign",
    "webkitBoxDecorationBreak",
    "webkitBoxDirection",
    "webkitBoxFlex",
    "webkitBoxOrdinalGroup",
    "webkitBoxOrient",
    "webkitBoxPack",
    "webkitBoxReflect",
    "webkitBoxShadow",
    "webkitBoxSizing",
    "webkitClipPath",
    "webkitColumnBreakAfter",
    "webkitColumnBreakBefore",
    "webkitColumnBreakInside",
    "webkitColumnCount",
    "webkitColumnGap",
    "webkitColumnRule",
    "webkitColumnRuleColor",
    "webkitColumnRuleStyle",
    "webkitColumnRuleWidth",
    "webkitColumnSpan",
    "webkitColumnWidth",
    "webkitColumns",
    "webkitFilter",
    "webkitFlex",
    "webkitFlexBasis",
    "webkitFlexDirection",
    "webkitFlexFlow",
    "webkitFlexGrow",
    "webkitFlexShrink",
    "webkitFlexWrap",
    "webkitFontFeatureSettings",
    "webkitFontSizeDelta",
    "webkitFontSmoothing",
    "webkitHighlight",
    "webkitHyphenateCharacter",
    "webkitJustifyContent",
    "webkitLineBreak",
    "webkitLineClamp",
    "webkitLocale",
    "webkitLogicalHeight",
    "webkitLogicalWidth",
    "webkitMarginAfter",
    "webkitMarginBefore",
    "webkitMarginEnd",
    "webkitMarginStart",
    "webkitMask",
    "webkitMaskBoxImage",
    "webkitMaskBoxImageOutset",
    "webkitMaskBoxImageRepeat",
    "webkitMaskBoxImageSlice",
    "webkitMaskBoxImageSource",
    "webkitMaskBoxImageWidth",
    "webkitMaskClip",
    "webkitMaskComposite",
    "webkitMaskImage",
    "webkitMaskOrigin",
    "webkitMaskPosition",
    "webkitMaskPositionX",
    "webkitMaskPositionY",
    "webkitMaskRepeat",
    "webkitMaskRepeatX",
    "webkitMaskRepeatY",
    "webkitMaskSize",
    "webkitMaxLogicalHeight",
    "webkitMaxLogicalWidth",
    "webkitMinLogicalHeight",
    "webkitMinLogicalWidth",
    "webkitOpacity",
    "webkitOrder",
    "webkitPaddingAfter",
    "webkitPaddingBefore",
    "webkitPaddingEnd",
    "webkitPaddingStart",
    "webkitPerspective",
    "webkitPerspectiveOrigin",
    "webkitPerspectiveOriginX",
    "webkitPerspectiveOriginY",
    "webkitPrintColorAdjust",
    "webkitRtlOrdering",
    "webkitRubyPosition",
    "webkitShapeImageThreshold",
    "webkitShapeMargin",
    "webkitShapeOutside",
    "webkitTapHighlightColor",
    "webkitTextCombine",
    "webkitTextDecorationsInEffect",
    "webkitTextEmphasis",
    "webkitTextEmphasisColor",
    "webkitTextEmphasisPosition",
    "webkitTextEmphasisStyle",
    "webkitTextFillColor",
    "webkitTextOrientation",
    "webkitTextSecurity",
    "webkitTextSizeAdjust",
    "webkitTextStroke",
    "webkitTextStrokeColor",
    "webkitTextStrokeWidth",
    "webkitTransform",
    "webkitTransformOrigin",
    "webkitTransformOriginX",
    "webkitTransformOriginY",
    "webkitTransformOriginZ",
    "webkitTransformStyle",
    "webkitTransition",
    "webkitTransitionDelay",
    "webkitTransitionDuration",
    "webkitTransitionProperty",
    "webkitTransitionTimingFunction",
    "webkitUserDrag",
    "webkitUserModify",
    "webkitUserSelect",
    "webkitWritingMode",
    "whiteSpace",
    "widows",
    "width",
    "willChange",
    "wordBreak",
    "wordSpacing",
    "wordWrap",
    "writingMode",
    "x",
    "y",
    "zIndex",
    "zoom",
]