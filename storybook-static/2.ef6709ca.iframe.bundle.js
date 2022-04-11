(window.webpackJsonp = window.webpackJsonp || []).push([
    [2],
    {
        1163: function (module, __webpack_exports__, __webpack_require__) {
            'use strict';
            __webpack_require__.r(__webpack_exports__);
            var empty_style = __webpack_require__(3),
                empty_style_default = __webpack_require__.n(empty_style),
                engine_dom_cjs = __webpack_require__(0);
            function tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M46 9H6c-2.7 0-5 2.2-5 5v24c0 2.7 2.3 5 5 5h40c2.8 0 5-2.2 5-5V14c0-2.8-2.2-5-5-5zM24.8 37.2H10.4c-1.6 0-2.8-1.7-2.8-3.4.1-2.5 2.7-4 5.4-5.2 1.9-.8 2.2-1.6 2.2-2.4 0-.8-.5-1.6-1.2-2.2-1.1-1-1.7-2.5-1.7-4.1 0-3.2 1.9-5.8 5.2-5.8s5.2 2.7 5.2 5.8c0 1.7-.6 3.2-1.7 4.1-.7.6-1.2 1.3-1.2 2.2 0 .8.2 1.6 2.2 2.3 2.7 1.2 5.3 2.8 5.4 5.3.3 1.7-1 3.4-2.6 3.4zm19.5-5.8c0 .9-.8 1.7-1.7 1.7h-7.5c-.9 0-1.7-.7-1.7-1.7v-2.5c0-.9.8-1.7 1.7-1.7h7.5c.9 0 1.7.7 1.7 1.7v2.5zm0-9.1c0 .9-.8 1.7-1.7 1.7H30.2c-.9 0-1.7-.7-1.7-1.7v-2.5c0-.9.8-1.7 1.7-1.7h12.5c.9 0 1.7.7 1.7 1.7v2.5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            var add_contact = Object(engine_dom_cjs.registerTemplate)(tmpl);
            function add_file_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M9.7 36.1V11.3c-2.6 0-4.7 2.1-4.7 4.6v29.4C5 47.9 7.1 50 9.7 50H33c2.6 0 4.7-2.1 4.7-4.6H19c-5.1 0-9.3 0-9.3-9.3zm35.7-20.2h-7.8c-2.6 0-4.7-2.1-4.7-4.6V3.5c.1-.8-.6-1.5-1.5-1.5H19c-2.6 0-4.7 2.1-4.7 4.6V36c0 2.6 2.1 4.6 4.7 4.6h23.3c2.6 0 4.7-2.1 4.7-4.6V17.5c0-.9-.7-1.6-1.6-1.6zm1.3-6.5l-7.2-7.1c-.2-.2-.4-.3-.7-.3-.6 0-1.1.5-1.1 1.1v5.1c0 1.7 1.4 3.1 3.1 3.1h5.1c.6 0 1.1-.5 1.1-1.1 0-.3-.1-.5-.3-.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (tmpl.stylesheets = []),
                empty_style_default.a &&
                    tmpl.stylesheets.push.apply(
                        tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_add_contact-host',
                    shadowAttribute: 'buildTemplates-action_add_contact'
                });
            var add_file = Object(engine_dom_cjs.registerTemplate)(
                add_file_tmpl
            );
            function add_photo_video_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 20c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm20-6h-5.2c-1.4 0-2.6-.7-3.4-1.8l-2.3-3.5C34.4 7 32.7 6 30.9 6h-9.8c-1.8 0-3.5 1-4.3 2.7l-2.3 3.5c-.7 1.1-2 1.8-3.4 1.8H6c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4zM26 40c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (add_file_tmpl.stylesheets = []),
                empty_style_default.a &&
                    add_file_tmpl.stylesheets.push.apply(
                        add_file_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (add_file_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_add_file-host',
                    shadowAttribute: 'buildTemplates-action_add_file'
                });
            var add_photo_video = Object(engine_dom_cjs.registerTemplate)(
                add_photo_video_tmpl
            );
            function add_relationship_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M36 20c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4v26c0 2.2 1.8 4 4 4h26c2.2 0 4-1.8 4-4V20zm-8 14c0 .5-.5 1-1 1h-6v6c0 .5-.5 1-1 1h-2c-.5 0-1-.5-1-1v-6h-6c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h6v-6c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v6h6c.5 0 1 .5 1 1v2zm15 8h-3v-6h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1H17c-.6 0-1 .4-1 1v3h-6V9c0-3.9 3.1-7 7-7h26c3.9 0 7 3.1 7 7v26c0 3.9-3.1 7-7 7z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (add_photo_video_tmpl.stylesheets = []),
                empty_style_default.a &&
                    add_photo_video_tmpl.stylesheets.push.apply(
                        add_photo_video_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (add_photo_video_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_add_photo_video-host',
                    shadowAttribute: 'buildTemplates-action_add_photo_video'
                });
            var add_relationship = Object(engine_dom_cjs.registerTemplate)(
                add_relationship_tmpl
            );
            function adjust_value_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M23 14.91a6.55 6.55 0 11-6.52 6.55A6.53 6.53 0 0123 14.91zm20.7 15.72a.58.58 0 000-.84l-4.12-4.12a.59.59 0 00-.42-.18.61.61 0 00-.43.18L27.39 37.05l-1.7 5.69a.8.8 0 00.79 1 .55.55 0 00.18 0L32.35 42zm-1.45-7.75L46.4 27a.63.63 0 00.43.18.59.59 0 00.42-.18c.73-.73 2.06-1.94 2.06-1.94a2 2 0 000-2.91L47.13 20a2 2 0 00-1.41-.54 2.34 2.34 0 00-1.5.54s-1.33 1.31-1.93 2a.58.58 0 000 .88zM40.1 8.27H6a4 4 0 00-3.93 4v19.07A4 4 0 006 35.28h18.84l3.95-3.94H10.54A4.53 4.53 0 006 26.76v-9.88a4.53 4.53 0 004.56-4.57h25a4.53 4.53 0 004.56 4.57v3L44 15.91v-3.6a4 4 0 00-3.9-4.04z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (add_relationship_tmpl.stylesheets = []),
                empty_style_default.a &&
                    add_relationship_tmpl.stylesheets.push.apply(
                        add_relationship_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (add_relationship_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_add_relationship-host',
                    shadowAttribute: 'buildTemplates-action_add_relationship'
                });
            var adjust_value = Object(engine_dom_cjs.registerTemplate)(
                adjust_value_tmpl
            );
            function announcement_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M22.7 45.4l-1.3-1c-1.4-1-1.4-3-1.4-4v-2.9c0-.8-.7-1.5-1.5-1.5h-6c-.8 0-1.5.7-1.5 1.5v7.7c0 2.7 1.6 4.8 4.1 4.8H20c2.9 0 3.1-2 3.1-2s.5-1.8-.4-2.6zM45 18V4.4v-.1c0-2.4-3-3.1-4.6-1.5l-8.9 8.4c-1.4 1.2-3.2 1.7-5 1.7H11.3C6.1 13 2 17.5 2 22.7v.2c0 5.2 4.1 9.1 9.3 9.1h15.2c1.9 0 3.7.8 5.1 2l8.8 8.6c1.6 1.6 4.6 1 4.6-1.4V27.6c3 0 4.8-2.1 4.8-4.8 0-2.7-1.8-4.8-4.8-4.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (adjust_value_tmpl.stylesheets = []),
                empty_style_default.a &&
                    adjust_value_tmpl.stylesheets.push.apply(
                        adjust_value_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (adjust_value_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_adjust_value-host',
                    shadowAttribute: 'buildTemplates-action_adjust_value'
                });
            var announcement = Object(engine_dom_cjs.registerTemplate)(
                announcement_tmpl
            );
            function apex_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 40h-27c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h27c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM25.4 21.8L6 6.3c-.6-.5-1.5-.4-2 .3L2.3 9c-.5.7-.3 1.6.3 2.1l13.8 11c.5.4.5 1.2 0 1.6l-13.8 11c-.6.5-.8 1.5-.3 2.1L4 39.4c.5.7 1.4.8 2 .3l19.4-15.5c.8-.6.8-1.8 0-2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (announcement_tmpl.stylesheets = []),
                empty_style_default.a &&
                    announcement_tmpl.stylesheets.push.apply(
                        announcement_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (announcement_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_announcement-host',
                    shadowAttribute: 'buildTemplates-action_announcement'
                });
            var apex = Object(engine_dom_cjs.registerTemplate)(apex_tmpl);
            function approval_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M19 43.6L2.5 27c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0l12.4 12.5c.4.4 1.1.4 1.5 0l24.3-24.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.2 43.6c-.6.7-1.6.7-2.2 0z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (apex_tmpl.stylesheets = []),
                empty_style_default.a &&
                    apex_tmpl.stylesheets.push.apply(
                        apex_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (apex_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_apex-host',
                    shadowAttribute: 'buildTemplates-action_apex'
                });
            var approval = Object(engine_dom_cjs.registerTemplate)(
                approval_tmpl
            );
            function back_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.5 22H15.3c-.9 0-1.3-1.1-.7-1.7l9.6-9.6c.6-.6.6-1.5 0-2.1L22 6.4c-.6-.6-1.5-.6-2.1 0L2.4 23.9c-.6.6-.6 1.5 0 2.1l17.5 17.5c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-9.6-9.6c-.6-.6-.2-1.7.7-1.7h33.2c.8 0 1.5-.7 1.5-1.5v-3c.1-.8-.6-1.5-1.4-1.5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (approval_tmpl.stylesheets = []),
                empty_style_default.a &&
                    approval_tmpl.stylesheets.push.apply(
                        approval_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (approval_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_approval-host',
                    shadowAttribute: 'buildTemplates-action_approval'
                });
            var back = Object(engine_dom_cjs.registerTemplate)(back_tmpl);
            function bug_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M19.7 10.1h12.7c.9 0 1.6-.9 1.4-1.7-.8-3.6-4-6.2-7.8-6.2s-7 2.7-7.8 6.2c-.1.8.6 1.7 1.5 1.7zm27.8 20.7c1.4 0 2.5-1.1 2.4-2.5-.1-1.3-1.2-2.3-2.6-2.3h-7v-4c4.6-1.8 7.9-6.8 7.9-12.6 0-1.2-.8-2.2-2-2.5-1.5-.2-2.8.9-2.8 2.4 0 3.4-1.6 6.4-3.9 7.8-.9-1.4-2.4-2.2-4.1-2.2H16.5c-1.7 0-3.2.9-4.1 2.2-2.3-1.4-3.9-4.3-3.9-7.6 0-1.3-1-2.5-2.2-2.5-1.4-.1-2.5 1-2.5 2.3 0 5.9 3.3 10.9 7.9 12.7v4h-7c-1.3 0-2.5 1-2.5 2.2-.1 1.4 1 2.5 2.4 2.5h7.2v4c-4.6 1.8-7.9 6.8-7.9 12.6 0 1.2.8 2.2 2 2.5 1.5.2 2.8-.9 2.8-2.4 0-3.3 1.5-6.3 3.8-7.7 1.4 4.5 4.8 7.9 9.2 9.4 1 .3 2.1-.5 2.1-1.5V28.5c0-1.3 1-2.5 2.2-2.5 1.4-.1 2.5 1 2.5 2.4v19.2c0 1.1 1 1.8 2.1 1.5 4.4-1.4 7.9-4.9 9.2-9.4 2.2 1.4 3.7 4.3 3.8 7.5 0 1.3 1 2.5 2.2 2.5 1.4.1 2.5-1 2.5-2.4 0-5.9-3.3-10.9-7.9-12.7v-4h7.1v.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (back_tmpl.stylesheets = []),
                empty_style_default.a &&
                    back_tmpl.stylesheets.push.apply(
                        back_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (back_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_back-host',
                    shadowAttribute: 'buildTemplates-action_back'
                });
            var bug = Object(engine_dom_cjs.registerTemplate)(bug_tmpl);
            function call_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.5 37.8l-6.1-4.9c-1.4-1.1-3.4-1.2-4.8-.1l-5.2 3.8c-.6.5-1.5.4-2.1-.2l-7.8-7-7-7.8c-.6-.6-.6-1.4-.2-2.1l3.8-5.2c1.1-1.4 1-3.4-.1-4.8l-4.9-6.1c-1.5-1.8-4.2-2-5.9-.3l-5 5.2c-.8.8-1.2 2-1.2 3.1.5 10.2 5.1 19.9 11.9 26.7 6.8 6.8 16.5 11.4 26.7 11.9 1.1.1 2.2-.4 3-1.2l5.2-5.2c1.7-1.6 1.6-4.4-.3-5.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (bug_tmpl.stylesheets = []),
                empty_style_default.a &&
                    bug_tmpl.stylesheets.push.apply(
                        bug_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (bug_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_bug-host',
                    shadowAttribute: 'buildTemplates-action_bug'
                });
            var call = Object(engine_dom_cjs.registerTemplate)(call_tmpl);
            function canvas_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45 38.4c-.2 2.7-.5 5.6-1 8.4-.1.8-1 1.7-1.8 1.8-5.4.6-10.7 1-16.1 1-5.3 0-10.7-.3-16-1-.8-.1-1.7-.9-1.8-1.8-.7-4.4-1.1-8.9-1.1-13.4s.4-9 1.1-13.4c.1-.8 1-1.6 1.8-1.8 3.3-.4 6.5-.6 9.7-.8 0 0 2.6-.1 2.4-2.6-.2-2.2-4-3.7-4-7.4 0-3 3-5.4 7.9-5.4 4.8 0 7.8 2.4 7.8 5.4 0 3.8-3.7 5.2-3.9 7.4-.2 2.4 2.4 2.6 2.4 2.6 3.3.1 6.6.4 9.8.8.8.1 1.7.9 1.8 1.8.5 3.1.8 6 1 9.1 0 .9-.7 1.8-1.6 1.8h-.9c-.9 0-2.3-.7-2.9-1.4 0 0-2.1-2.2-4.4-2.3-3.7-.1-6.5 3.1-6.5 6.6s2.8 6.8 6.4 6.7c2.2-.1 4.4-2.3 4.4-2.3.7-.6 2-1.2 2.9-1.2h.9c1.1 0 1.8.6 1.7 1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (call_tmpl.stylesheets = []),
                empty_style_default.a &&
                    call_tmpl.stylesheets.push.apply(
                        call_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (call_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_call-host',
                    shadowAttribute: 'buildTemplates-action_call'
                });
            var canvas = Object(engine_dom_cjs.registerTemplate)(canvas_tmpl);
            function change_owner_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M27.3 37.6c-3-1.2-3.5-2.3-3.5-3.5 0-1.2.8-2.3 1.8-3.2 1.8-1.5 2.6-3.9 2.6-6.4 0-4.7-2.9-8.5-8.3-8.5s-8.3 3.8-8.3 8.5c0 2.5.8 4.9 2.6 6.4 1 .9 1.8 2 1.8 3.2 0 1.2-.5 2.3-3.5 3.5-4.4 1.8-8.6 3.8-8.7 7.6C4 47.8 6 50 8.5 50h23c2.5 0 4.5-2.2 4.5-4.7-.1-3.8-4.3-5.9-8.7-7.7zM44.5 19c0-7.4-6.1-13.5-13.5-13.5V2l-6.8 5.5c-.3.3-.2.8.1 1.1L31 14v-3.5c4.7 0 8.5 3.8 8.5 8.5H36l5.5 6.8c.3.3.8.3 1.1 0L48 19h-3.5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (canvas_tmpl.stylesheets = []),
                empty_style_default.a &&
                    canvas_tmpl.stylesheets.push.apply(
                        canvas_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (canvas_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_canvas-host',
                    shadowAttribute: 'buildTemplates-action_canvas'
                });
            var change_owner = Object(engine_dom_cjs.registerTemplate)(
                change_owner_tmpl
            );
            function change_record_type_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M20 37.5c0-.8-.7-1.5-1.5-1.5h-15c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-11zM8.1 22H3.2c-1 0-1.5.9-.9 1.4l8 8.3c.4.3 1 .3 1.4 0l8-8.3c.6-.6.1-1.4-.9-1.4h-4.7c0-5 4.9-10 9.9-10V6C15 6 8.1 13 8.1 22zM41.8 20.3c-.4-.3-1-.3-1.4 0l-8 8.3c-.6.6-.1 1.4.9 1.4h4.8c0 6-4.1 10-10.1 10v6c9 0 16.1-7 16.1-16H49c1 0 1.5-.9.9-1.4l-8.1-8.3zM50 3.5c0-.8-.7-1.5-1.5-1.5h-15c-.8 0-1.5.7-1.5 1.5v11c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-11z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (change_owner_tmpl.stylesheets = []),
                empty_style_default.a &&
                    change_owner_tmpl.stylesheets.push.apply(
                        change_owner_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (change_owner_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_change_owner-host',
                    shadowAttribute: 'buildTemplates-action_change_owner'
                });
            var change_record_type = Object(engine_dom_cjs.registerTemplate)(
                change_record_type_tmpl
            );
            function check_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M19.1 42.5L2.6 25.9c-.6-.6-.6-1.6 0-2.2l2.2-2.2c.6-.6 1.6-.6 2.2 0L19.4 34c.4.4 1.1.4 1.5 0L45.2 9.5c.6-.6 1.6-.6 2.2 0l2.2 2.2c.6.6.6 1.6 0 2.2L21.3 42.5c-.6.7-1.6.7-2.2 0z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (change_record_type_tmpl.stylesheets = []),
                empty_style_default.a &&
                    change_record_type_tmpl.stylesheets.push.apply(
                        change_record_type_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (change_record_type_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_change_record_type-host',
                    shadowAttribute: 'buildTemplates-action_change_record_type'
                });
            var check = Object(engine_dom_cjs.registerTemplate)(check_tmpl);
            function clone_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M46 2H18c-2.2 0-4 1.8-4 4v2.5c0 .8.7 1.5 1.5 1.5H34c4.4 0 8 3.6 8 8v18.5c0 .8.7 1.5 1.5 1.5H46c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M34 14H6c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4zm-4 27c0 .6-.4 1-1 1H11c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H11c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H11c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (check_tmpl.stylesheets = []),
                empty_style_default.a &&
                    check_tmpl.stylesheets.push.apply(
                        check_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (check_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_check-host',
                    shadowAttribute: 'buildTemplates-action_check'
                });
            var clone = Object(engine_dom_cjs.registerTemplate)(clone_tmpl);
            function close_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M31.6 25.8l13.1-13.1c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0L27.4 21.6c-.4.4-1 .4-1.4 0L12.9 8.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8.6 40.3c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L26 31.4c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L31.6 27.2c-.3-.4-.3-1 0-1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (clone_tmpl.stylesheets = []),
                empty_style_default.a &&
                    clone_tmpl.stylesheets.push.apply(
                        clone_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (clone_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_clone-host',
                    shadowAttribute: 'buildTemplates-action_clone'
                });
            var action_close = Object(engine_dom_cjs.registerTemplate)(
                close_tmpl
            );
            function defer_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 2C12.8 2 2 12.8 2 26s10.8 24 24 24 24-10.8 24-24S39.2 2 26 2zm0 42c-9.9 0-18-8.1-18-18S16.1 8 26 8s18 8.1 18 18-8.1 18-18 18z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M29.4 26.2c-.3-.3-.4-.7-.4-1.1v-9.6c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v12.1c0 .4.2.8.4 1.1l7.4 7.4c.6.6 1.5.6 2.1 0L35 34c.6-.6.6-1.5 0-2.1l-5.6-5.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (close_tmpl.stylesheets = []),
                empty_style_default.a &&
                    close_tmpl.stylesheets.push.apply(
                        close_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (close_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_close-host',
                    shadowAttribute: 'buildTemplates-action_close'
                });
            var defer = Object(engine_dom_cjs.registerTemplate)(defer_tmpl);
            function delete_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.5 10H33V6c0-2.2-1.8-4-4-4h-6c-2.2 0-4 1.8-4 4v4H6.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h39c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zM23 7c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3h-6V7zM41.5 20h-31c-.8 0-1.5.7-1.5 1.5V45c0 2.8 2.2 5 5 5h24c2.8 0 5-2.2 5-5V21.5c0-.8-.7-1.5-1.5-1.5zM23 42c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14zm10 0c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V28c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v14z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (defer_tmpl.stylesheets = []),
                empty_style_default.a &&
                    defer_tmpl.stylesheets.push.apply(
                        defer_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (defer_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_defer-host',
                    shadowAttribute: 'buildTemplates-action_defer'
                });
            var action_delete = Object(engine_dom_cjs.registerTemplate)(
                delete_tmpl
            );
            function description_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M4 8v36c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4H8C5.8 4 4 5.8 4 8zm36 16c0 .6-.4 1-1 1H29c-.6 0-1-.4-1-1V14c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10zM16 38c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H17c-.6 0-1-.4-1-1v-2zm-4-8c0-.6.4-1 1-1h26c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H13c-.6 0-1-.4-1-1v-2zm0-8c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H13c-.6 0-1-.4-1-1v-2zm0-8c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H13c-.6 0-1-.4-1-1v-2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (delete_tmpl.stylesheets = []),
                empty_style_default.a &&
                    delete_tmpl.stylesheets.push.apply(
                        delete_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (delete_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_delete-host',
                    shadowAttribute: 'buildTemplates-action_delete'
                });
            var description = Object(engine_dom_cjs.registerTemplate)(
                description_tmpl
            );
            function dial_in_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '10',
                                                cy: '10',
                                                r: '6'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '10',
                                                cy: '26',
                                                r: '6'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '26',
                                                cy: '10',
                                                r: '6'
                                            },
                                            key: 5
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '42',
                                                cy: '10',
                                                r: '6'
                                            },
                                            key: 6
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '26',
                                                cy: '26',
                                                r: '6'
                                            },
                                            key: 7
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '42',
                                                cy: '26',
                                                r: '6'
                                            },
                                            key: 8
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '10',
                                                cy: '42',
                                                r: '6'
                                            },
                                            key: 9
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '26',
                                                cy: '42',
                                                r: '6'
                                            },
                                            key: 10
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '42',
                                                cy: '42',
                                                r: '6'
                                            },
                                            key: 11
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (description_tmpl.stylesheets = []),
                empty_style_default.a &&
                    description_tmpl.stylesheets.push.apply(
                        description_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (description_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_description-host',
                    shadowAttribute: 'buildTemplates-action_description'
                });
            var dial_in = Object(engine_dom_cjs.registerTemplate)(dial_in_tmpl);
            function download_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 31h-3c-.8 0-1.5.7-1.5 1.5v10c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-10c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V46c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V32.5c0-.8-.7-1.5-1.5-1.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M25 37.6c.6.6 1.5.6 2.1 0l13.5-13.5c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0l-5.6 5.6c-.6.6-1.7.2-1.7-.7V3.5C29 2.7 28.2 2 27.5 2h-3c-.8 0-1.5.7-1.5 1.5v21.2c0 .9-1.1 1.3-1.7.7l-5.6-5.6c-.6-.6-1.5-.6-2.1 0L11.5 22c-.6.6-.6 1.5 0 2.1L25 37.6z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (dial_in_tmpl.stylesheets = []),
                empty_style_default.a &&
                    dial_in_tmpl.stylesheets.push.apply(
                        dial_in_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (dial_in_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_dial_in-host',
                    shadowAttribute: 'buildTemplates-action_dial_in'
                });
            var download = Object(engine_dom_cjs.registerTemplate)(
                download_tmpl
            );
            function edit_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.8 7.4l-4.2-4.2c-1.6-1.6-4.1-1.6-5.6 0l-3.3 3.3c-.4.4-.4 1 0 1.4l8.5 8.5c.4.4 1 .4 1.4 0l3.3-3.3c1.5-1.6 1.5-4.1-.1-5.7zM32.9 10.7c-.4-.4-1-.4-1.4 0L5.4 36.8 2.1 48.1c-.3 1.1.7 2.2 1.8 1.9l11.4-3.2h-.1l26.1-26.1c.4-.4.4-1 0-1.4l-8.4-8.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (download_tmpl.stylesheets = []),
                empty_style_default.a &&
                    download_tmpl.stylesheets.push.apply(
                        download_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (download_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_download-host',
                    shadowAttribute: 'buildTemplates-action_download'
                });
            var edit = Object(engine_dom_cjs.registerTemplate)(edit_tmpl);
            function edit_groups_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M39.4 31.5c-.2-.2-.6-.2-.8 0L26.9 43.2 25.2 49c-.2.6.4 1.1 1 1l5.9-1.7 11.7-11.7c.2-.2.2-.6 0-.8l-4.4-4.3zM49.4 28l-2.2-2.2c-.8-.8-2.1-.8-2.9 0 0 0-1.3 1.3-2 2.1-.2.2-.2.6 0 .8l4.2 4.2c.2.2.6.2.8 0 .7-.7 2.1-2 2.1-2 .8-.8.8-2.1 0-2.9zM26 13.7c0 2.2-.6 4.3-1.8 6.1-.4.6-.2 1.5.5 1.9 2.2 1.1 4.7 2.5 6.1 4.9.2.4.7.5 1.1.5h2.8c1.8 0 3-1.2 3-3.1-.1-2.8-2.9-4.5-5.9-5.8-2.1-.9-2.4-1.7-2.4-2.6 0-.9.6-1.7 1.3-2.4 1.2-1.1 1.9-2.7 1.9-4.6C32.5 5 30.4 2 26.7 2c-2.2 0-3.9 1.1-4.8 2.7 2.5 1.9 4.1 5.1 4.1 9z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27.5 30.3c-.1-3.2-3.3-4.6-6.7-6.1-2.3-1-2.7-1.9-2.7-2.9s.6-2 1.4-2.7c1.4-1.3 2.1-3.1 2.1-5.2 0-3.9-2.3-7.3-6.5-7.3h-.4c-4.2 0-6.5 3.4-6.5 7.3 0 2.1.7 3.9 2.1 5.2.8.7 1.4 1.7 1.4 2.7 0 1-.4 1.9-2.7 2.9-3.4 1.5-6.6 3-6.7 6.1C2.5 32.4 4 34 6 34h18c2 0 3.5-1.6 3.5-3.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (edit_tmpl.stylesheets = []),
                empty_style_default.a &&
                    edit_tmpl.stylesheets.push.apply(
                        edit_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (edit_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_edit-host',
                    shadowAttribute: 'buildTemplates-action_edit'
                });
            var edit_groups = Object(engine_dom_cjs.registerTemplate)(
                edit_groups_tmpl
            );
            function edit_relationship_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M43 42h-3v-6h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1H17c-.6 0-1 .4-1 1v3h-6V9c0-3.9 3.1-7 7-7h26c3.9 0 7 3.1 7 7v26c0 3.9-3.1 7-7 7z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M32 16H6c-2.2 0-4 1.8-4 4v26c0 2.2 1.8 4 4 4h26c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4zM14.8 41.5c-.2.2-.3.2-.5.3l-4.5 1.1c-.4.1-.8-.3-.7-.7l1.1-4.5c0-.1.1-.2.2-.4l.1-.1c.1-.1.4-.1.5 0l3.7 3.7c.2.3.2.6.1.6zm10.9-11l-9.2 9.3c-.2.2-.4.2-.6 0l-3.7-3.7c-.2-.1-.2-.4 0-.5l9.3-9.3c.2-.2.4-.2.6 0l3.7 3.7c0 .1 0 .3-.1.5zm2.8-2.8l-1 1c-.2.2-.4.2-.6 0L23.2 25c-.2-.2-.2-.4 0-.6l1-1c.7-.7 1.7-.7 2.4 0l2 2c.6.7.6 1.7-.1 2.3z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (edit_groups_tmpl.stylesheets = []),
                empty_style_default.a &&
                    edit_groups_tmpl.stylesheets.push.apply(
                        edit_groups_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (edit_groups_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_edit_groups-host',
                    shadowAttribute: 'buildTemplates-action_edit_groups'
                });
            var edit_relationship = Object(engine_dom_cjs.registerTemplate)(
                edit_relationship_tmpl
            );
            function email_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M24.9 30.1c.6.6 1.5.6 2.1 0l22.6-21c.5-.8.4-2.1-1.2-2.1l-44.8.1c-1.2 0-2.2 1.1-1.3 2.1l22.6 20.9z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 17.3c0-1-1.2-1.6-2-.9L30.3 32.7c-1.2 1.1-2.7 1.7-4.3 1.7s-3.1-.6-4.3-1.6L4.1 16.4c-.8-.7-2-.2-2 .9C2 21.8 2 34 2 40c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17.3z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (edit_relationship_tmpl.stylesheets = []),
                empty_style_default.a &&
                    edit_relationship_tmpl.stylesheets.push.apply(
                        edit_relationship_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (edit_relationship_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_edit_relationship-host',
                    shadowAttribute: 'buildTemplates-action_edit_relationship'
                });
            var email = Object(engine_dom_cjs.registerTemplate)(email_tmpl);
            function fallback_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M28 3.5l-3 14.6c0 .6.4.9.9.9h15.6c1.1 0 1.8 1.3 1.3 2.3l-17 27.9c-.7 1.4-2.8.9-2.8-.7l3-17.2c0-.6-.5-.4-1.1-.4H8.5c-1.1 0-1.9-1.6-1.3-2.6l18-25.5c.7-1.3 2.8-.9 2.8.7z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (email_tmpl.stylesheets = []),
                empty_style_default.a &&
                    email_tmpl.stylesheets.push.apply(
                        email_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (email_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_email-host',
                    shadowAttribute: 'buildTemplates-action_email'
                });
            var fallback = Object(engine_dom_cjs.registerTemplate)(
                fallback_tmpl
            );
            function filter_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.2 4H3.8C2.4 4 1.6 5.7 2.5 6.8L22 29.5c.6.7 1 1.7 1 2.6v14.4c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V32.1c0-1 .3-1.9 1-2.6L49.5 6.8c.9-1.1.2-2.8-1.3-2.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (fallback_tmpl.stylesheets = []),
                empty_style_default.a &&
                    fallback_tmpl.stylesheets.push.apply(
                        fallback_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (fallback_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_fallback-host',
                    shadowAttribute: 'buildTemplates-action_fallback'
                });
            var filter = Object(engine_dom_cjs.registerTemplate)(filter_tmpl);
            function flow_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49.9 10.6c-2.1-4.1-7.4-11.7-17.2-7.2-6.1 2.8-9.5 4.4-9.5 4.4l-8.8 3.8c-2.5 1.2-7.9-.5-11-1.6-.9-.3-1.7.6-1.3 1.5 2.1 4.1 7.4 11.7 17.2 7.2 6.1-2.8 18.3-8.1 18.3-8.1 2.5-1.2 7.9.5 11 1.6.9.2 1.7-.7 1.3-1.6zM28.8 23.4c-1.1.6-5.5 2.6-5.5 2.6l-4.4 1.9c-2.2 1.2-6.9-.4-9.7-1.5-.8-.4-1.5.6-1.1 1.4 1.8 4 6.5 11.2 15.1 6.8 5.4-2.7 9.9-4.5 9.9-4.5 2.2-1.2 6.9.4 9.7 1.5.8.3 1.5-.6 1.1-1.5-1.8-3.9-6.5-11.1-15.1-6.7zM25.6 41.1c-.9.5-2.4 1.4-2.4 1.4-1.7 1.1-5.2-.3-7.3-1.3-.6-.3-1.1.6-.8 1.4 1.3 3.6 4.8 10.1 11.3 6.1 2.4-1.5 2.4-1.4 2.4-1.4 1.8-.9 5.2.3 7.3 1.3.6.3 1.1-.6.8-1.4-1.3-3.6-4.6-9.8-11.3-6.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (filter_tmpl.stylesheets = []),
                empty_style_default.a &&
                    filter_tmpl.stylesheets.push.apply(
                        filter_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (filter_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_filter-host',
                    shadowAttribute: 'buildTemplates-action_filter'
                });
            var flow = Object(engine_dom_cjs.registerTemplate)(flow_tmpl);
            function follow_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M2 39.5v3c0 .8.7 1.5 1.5 1.5H8v4.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V44h4.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H14v-4.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V38H3.5c-.8 0-1.5.7-1.5 1.5zM24 38v6.4c-.1.9.6 1.6 1.5 1.6H48c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H12C9.8 2 8 3.8 8 6v20.5c0 .8.7 1.5 1.5 1.5H14c2.2 0 4 1.8 4 4v1c0 .6.4 1 1 1h1c2.2 0 4 1.8 4 4zm4-25c0 .6-.4 1-1 1H17c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2zm0 8c0 .6-.4 1-1 1H17c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2zm16 0c0 .6-.4 1-1 1H33c-.6 0-1-.4-1-1V11c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10zM28 35c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H29c-.6 0-1-.4-1-1v-2zm-5-5c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h20c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H23z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (flow_tmpl.stylesheets = []),
                empty_style_default.a &&
                    flow_tmpl.stylesheets.push.apply(
                        flow_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (flow_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_flow-host',
                    shadowAttribute: 'buildTemplates-action_flow'
                });
            var follow = Object(engine_dom_cjs.registerTemplate)(follow_tmpl);
            function following_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26.6 33.6l-2.2-2.2c-.6-.6-1.6-.6-2.2 0L12.8 41c-.4.4-1.1.4-1.5 0l-4.4-4.5c-.6-.6-1.6-.6-2.2 0l-2.2 2.2c-.6.6-.6 1.6 0 2.2l8.4 8.6c.6.6 1.6.6 2.2 0l13.4-13.7c.7-.5.7-1.5.1-2.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M46 2H10.1c-2.2 0-4 1.8-4 4v26.1c1.4.1 2.7.6 3.7 1.6l2.3 2.3 7.3-7.5c.2-.2.4-.3.6-.5v-1c0-.6.4-1 1-1h20c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H28.6l.8.8.1.1.1.1c1.1 1.2 1.6 2.8 1.4 4.4-.2 1.3-.8 2.5-1.8 3.4L22.1 46H46c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4zm-4.1 35c0 .6-.4 1-.9 1h-6.1c-.5 0-.9-.4-.9-1v-2c0-.6.4-1 .9-1H41c.5 0 .9.4.9 1v2zM26 21c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2zm16 8c0 .6-.4 1-1 1H31c-.6 0-1-.4-1-1V11c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v10z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (follow_tmpl.stylesheets = []),
                empty_style_default.a &&
                    follow_tmpl.stylesheets.push.apply(
                        follow_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (follow_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_follow-host',
                    shadowAttribute: 'buildTemplates-action_follow'
                });
            var following = Object(engine_dom_cjs.registerTemplate)(
                following_tmpl
            );
            function freeze_user_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M27 3c.6 0 1 .4 1 1v45.9c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h2z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 17.2l-8.1-8.1c-.4-.4-.4-1 0-1.4l1.4-1.4c.4-.4 1-.4 1.4 0l5.3 5.3 5.3-5.3c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4L26 17.2M26 36.7l8.1 8.1c.4.4.4 1 0 1.4l-1.4 1.4c-.4.4-1 .4-1.4 0L26 42.3l-5.3 5.3c-.4.4-1 .4-1.4 0l-1.4-1.4c-.4-.4-.4-1 0-1.4l8.1-8.1M47.1 15.6c.3.5.2 1.1-.4 1.4L7.2 40.3c-.5.3-1.1.2-1.4-.4l-1-1.7c-.3-.5-.2-1.1.4-1.4l39.5-23.4c.5-.3 1.1-.2 1.4.4l1 1.8z'
                                        },
                                        key: 3
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M34.4 22l2.8-11.1c.1-.6.6-.9 1.2-.7l1.9.5c.6.1.9.6.7 1.2l-1.9 7.3 7.3 1.9c.6.1.9.6.7 1.2l-.5 1.9c-.1.6-.6.9-1.2.7l-11-2.9M17.6 31.9L14.8 43c-.1.6-.6.9-1.2.7l-1.9-.5c-.6-.1-.9-.6-.7-1.2l1.9-7.3-7.3-1.9c-.6-.1-.9-.6-.7-1.2l.5-1.9c.1-.6.6-.9 1.2-.7l11 2.9M5.9 13.9c.3-.5.9-.7 1.4-.4l39.5 23.4c.5.3.7.9.4 1.4l-1 1.7c-.3.5-.9.7-1.4.4L5.2 17c-.5-.3-.7-.9-.4-1.4l1.1-1.7z'
                                        },
                                        key: 4
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M17.6 22L6.5 24.9c-.6.1-1.1-.1-1.2-.7l-.5-1.9c-.1-.6.1-1.1.7-1.2l7.3-1.9-1.9-7.3c-.1-.6.1-1.1.7-1.2l1.9-.5c.6-.1 1.1.1 1.2.7L17.6 22M34.3 31.9L45.4 29c.6-.1 1.1.1 1.2.7l.5 1.9c.1.6-.1 1.1-.7 1.2l-7.3 1.9L41 42c.1.6-.1 1.1-.7 1.2l-1.9.5c-.6.1-1.1-.1-1.2-.7l-2.9-11.1'
                                        },
                                        key: 5
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (following_tmpl.stylesheets = []),
                empty_style_default.a &&
                    following_tmpl.stylesheets.push.apply(
                        following_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (following_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_following-host',
                    shadowAttribute: 'buildTemplates-action_following'
                });
            var freeze_user = Object(engine_dom_cjs.registerTemplate)(
                freeze_user_tmpl
            );
            function goal_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M44 5v42c0 1.7 1.4 3 3 3 1.7 0 3-1.4 3-3V5c0-1.7-1.3-3-3-3s-3 1.3-3 3zM2 7.2v23.6c0 .6.4 1.1.9 1.4 12.8 7 23-4.1 34.8-.6 1.1.3 2.3-.5 2.3-1.6V7.6c0-.7-.6-1.3-1.2-1.5-12.3-4.5-22.6 7.2-35.6.4-.5-.3-1.2.1-1.2.7zm3.9 22v-5.7c1.8.8 3.9 1.5 5.8 1.5h.2v-6.4h-.4c-1.9 0-3.8-.2-5.6-.7v-6l1.2.4c2 .3 3.1.7 4.7.7h.2v5.5c1.6 0 4.3-.2 6-.5v-5.7c2.1-.3 4.2-.9 6-1.4v5.8c.1 0 .3-.1.4-.1 1.8-.5 4.2-1 5.6-1.3V9.5c1.1-.3 4.1-.5 5.1-.4l.9.1v6.2c-1-.3-4.9-.3-6-.1v6c1.1-.2 1.2-.3 2.5-.3s2.5 0 3.5.2V27l-1.6-.1c-.7-.1-1.1-.1-1.6-.1-1.3 0-1.6.1-2.8.3v-5.7c-1.7.4-4.3.9-6 1.4v5.5c-.4.1-.9.3-1.4.4-1.3.3-2.9.6-4.6.9v-5.3c-1.8.4-4.5.7-6 .7v5h-.2c-2.7 0-4.3-.1-5.3-.6l-.5-.2h-.1zM18 18.1v6.2c1.7-.3 3.3-.8 4.8-1.2.4-.2.8-.3 1.2-.4v-6c-1.8.5-3.9 1-6 1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (freeze_user_tmpl.stylesheets = []),
                empty_style_default.a &&
                    freeze_user_tmpl.stylesheets.push.apply(
                        freeze_user_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (freeze_user_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_freeze_user-host',
                    shadowAttribute: 'buildTemplates-action_freeze_user'
                });
            var goal = Object(engine_dom_cjs.registerTemplate)(goal_tmpl);
            function google_news_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M0 6v38c0 2.2 1.8 4 4 4h44c2.2 0 4-1.8 4-4V6c0-.9-1.1-1.3-1.7-.7l-2.6 2.6c-.4.4-1 .4-1.4 0l-3.6-3.6c-.4-.4-1-.4-1.4 0l-3.6 3.6c-.4.4-1 .4-1.4 0l-3.6-3.6c-.4-.4-1-.4-1.4 0l-3.6 3.6c-.4.4-1 .4-1.4 0l-3.6-3.6c-.4-.4-1-.4-1.4 0l-3.6 3.6c-.4.4-1 .4-1.4 0l-3.6-3.6c-.4-.4-1-.4-1.4 0L6.7 8.9c-.4.4-1 .4-1.4 0L1.7 5.3C1.1 4.7 0 5.1 0 6zm31 17c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v18c0 .6-.4 1-1 1H32c-.6 0-1-.4-1-1V23zM7 39c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1v-2zm0-9h20v4H7v-4zm0-7c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1v-2zm0-8c0-.6.4-1 1-1h36c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1v-2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (goal_tmpl.stylesheets = []),
                empty_style_default.a &&
                    goal_tmpl.stylesheets.push.apply(
                        goal_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (goal_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_goal-host',
                    shadowAttribute: 'buildTemplates-action_goal'
                });
            var google_news = Object(engine_dom_cjs.registerTemplate)(
                google_news_tmpl
            );
            function info_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 12.1c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm5 21c0 .5-.4.9-1 .9h-8c-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1.5 0 1-.3 1-.9v-4c0-.5-.4-1.1-1-1.1-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1h6c.5 0 1 .5 1 1.1v8c0 .5.4.9 1 .9.5 0 1 .5 1 1.1v2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (google_news_tmpl.stylesheets = []),
                empty_style_default.a &&
                    google_news_tmpl.stylesheets.push.apply(
                        google_news_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (google_news_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_google_news-host',
                    shadowAttribute: 'buildTemplates-action_google_news'
                });
            var info = Object(engine_dom_cjs.registerTemplate)(info_tmpl);
            function join_group_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M36 23.9c-.1-2.8-2.8-4.5-5.7-5.8-2-.9-2.4-1.7-2.4-2.6 0-.9.6-1.7 1.2-2.4C30.4 12 31 10.4 31 8.5 31 5 29 2 25.3 2c-2.2 0-3.7 1.1-4.7 2.7 2.5 1.9 4 5.2 4 9 0 2.2-.6 4.3-1.7 6.1-.4.6-.2 1.5.5 1.9 2.1 1.1 4.5 2.5 5.9 4.9.2.4.6.5 1.1.5h2.7c1.7-.1 2.9-1.3 2.9-3.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M19.7 24.1c-2.3-1-2.6-1.9-2.6-2.9s.6-2 1.4-2.7c1.3-1.3 2-3.1 2-5.2 0-3.9-2.3-7.3-6.3-7.3H14h-.1c-4 0-6.3 3.4-6.3 7.3 0 2.1.7 3.9 2 5.2.8.7 1.4 1.7 1.4 2.7 0 1-.3 1.9-2.6 2.9-3.3 1.5-6.4 3-6.5 6.1C2 32.4 3.5 34 5.4 34h17.4c1.9 0 3.4-1.6 3.4-3.7-.1-3.2-3.3-4.7-6.5-6.2zM48.5 34H44v-4.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V34h-4.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5H38v4.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V40h4.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (info_tmpl.stylesheets = []),
                empty_style_default.a &&
                    info_tmpl.stylesheets.push.apply(
                        info_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (info_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_info-host',
                    shadowAttribute: 'buildTemplates-action_info'
                });
            var join_group = Object(engine_dom_cjs.registerTemplate)(
                join_group_tmpl
            );
            function lead_convert_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M19.6 22.7c-.5-.6-.2-1.5.5-1.7h8.6c6.4 0 11.6 5.5 11 12.1-.6 5.7-5.6 9.9-11.3 9.9h-3.2c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h3.5c9.3 0 16.8-7.5 17-16.7.2-9.5-7.9-17.3-17.4-17.4h-8s-2.6.1-1-1.7L25 7.6c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0L7.4 16.9c-.6.6-.6 1.5 0 2.1l13.5 13.5c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-5.5-5.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (join_group_tmpl.stylesheets = []),
                empty_style_default.a &&
                    join_group_tmpl.stylesheets.push.apply(
                        join_group_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (join_group_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_join_group-host',
                    shadowAttribute: 'buildTemplates-action_join_group'
                });
            var lead_convert = Object(engine_dom_cjs.registerTemplate)(
                lead_convert_tmpl
            );
            function leave_group_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M30.3 22.1c-2-.9-2.4-1.7-2.4-2.6 0-.9.6-1.7 1.2-2.4 1.2-1.1 1.8-2.7 1.8-4.6C31 9 29 6 25.3 6c-2.2 0-3.7 1.1-4.7 2.7 2.5 1.9 4 5.2 4 9 0 2.2-.6 4.3-1.7 6.1-.4.6-.2 1.5.5 1.9 2.1 1.1 4.5 2.5 5.9 4.9.2.4.6.5 1.1.5h2.7c1.7 0 2.9-1.2 2.9-3.1-.1-2.9-2.8-4.6-5.7-5.9z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M19.7 28.1c-2.3-1-2.6-1.9-2.6-2.9s.6-2 1.4-2.7c1.3-1.3 2-3.1 2-5.2 0-3.9-2.3-7.3-6.3-7.3h-.4c-4 0-6.3 3.4-6.3 7.3 0 2.1.7 3.9 2 5.2.8.7 1.4 1.7 1.4 2.7 0 1-.3 1.9-2.6 2.9-3.3 1.5-6.4 3-6.5 6.1C2 36.4 3.5 38 5.4 38h17.4c1.9 0 3.4-1.6 3.4-3.7-.1-3.2-3.3-4.7-6.5-6.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ]),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M32 42.5v-3c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5v3c0 .8-.7 1.5-1.5 1.5h-15c-.8 0-1.5-.7-1.5-1.5z'
                                        },
                                        key: 5
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (lead_convert_tmpl.stylesheets = []),
                empty_style_default.a &&
                    lead_convert_tmpl.stylesheets.push.apply(
                        lead_convert_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (lead_convert_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_lead_convert-host',
                    shadowAttribute: 'buildTemplates-action_lead_convert'
                });
            var leave_group = Object(engine_dom_cjs.registerTemplate)(
                leave_group_tmpl
            );
            function log_a_call_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M42.9 2H12.7C10 2 7.8 4.4 7.8 6.8v1.6H6.2C4.4 8.4 3 9.8 3 11.6s1.4 3.2 3.2 3.2h1.6v8H6.2C4.4 22.8 3 24.2 3 26s1.4 3.2 3.2 3.2h1.6v8H6.2c-1.8 0-3.2 1.4-3.2 3.2 0 1.8 1.4 3.2 3.2 3.2h1.6v1.6c0 2.4 2.2 4.8 4.9 4.8h30.2c2.7 0 5.1-2.4 5.1-5V6.6C48 3.9 45.6 2 42.9 2zM40 34.2l-2.2 2.2c-.5.5-1.2.8-1.8.7-5.3-.3-10.3-2.7-13.8-6.2s-5.9-8.5-6.2-13.8c0-.7.2-1.4.7-1.8l2.2-2.2c1-1 2.8-1 3.7.2l2.1 2.6c.7.9.7 2.1.1 3L23 21.5c-.2.3-.2.8.1 1l3.7 4.1 4.1 3.7c.3.3.7.3 1 .1l2.5-1.8c.9-.6 2.2-.6 3.1.1l2.6 2.1c.9.6 1 2.4-.1 3.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (leave_group_tmpl.stylesheets = []),
                empty_style_default.a &&
                    leave_group_tmpl.stylesheets.push.apply(
                        leave_group_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (leave_group_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_leave_group-host',
                    shadowAttribute: 'buildTemplates-action_leave_group'
                });
            var log_a_call = Object(engine_dom_cjs.registerTemplate)(
                log_a_call_tmpl
            );
            function log_event_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M38.7 40.2l-4.8 1.6c-.4.1-.9.2-1.3.2-1.4 0-2.8-.7-3.7-1.8-.9-1.1-1.1-2.7-.8-4.1l1.6-5.7 7.5-7.5c.3-.3.1-.9-.4-.9H5.5c-.8 0-1.5.7-1.5 1.5V42c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4v-.8c0-.7-.7-1.2-1.3-1zM5.5 18h33c.8 0 1.5-.7 1.5-1.5V14c0-2.2-1.8-4-4-4h-3V9c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v1H17V9c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v1H8c-2.2 0-4 1.8-4 4v2.5c0 .8.7 1.5 1.5 1.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M43.5 23.1c-.2-.2-.5-.2-.7 0l-9.4 9.4-1.4 4.7c-.1.5.3.9.8.8l4.7-1.4 9.4-9.4c.2-.2.2-.5 0-.7l-3.4-3.4zM51.5 20.2l-1.8-1.8c-.6-.6-1.7-.6-2.4 0 0 0-1.1 1.1-1.6 1.7-.2.2-.2.5 0 .7l3.4 3.4c.2.2.5.2.7 0 .6-.6 1.7-1.6 1.7-1.6.7-.6.7-1.7 0-2.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (log_a_call_tmpl.stylesheets = []),
                empty_style_default.a &&
                    log_a_call_tmpl.stylesheets.push.apply(
                        log_a_call_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (log_a_call_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_log_a_call-host',
                    shadowAttribute: 'buildTemplates-action_log_a_call'
                });
            var log_event = Object(engine_dom_cjs.registerTemplate)(
                log_event_tmpl
            );
            function manage_perm_sets_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45 2H7C4.2 2 2 4.2 2 7v38c0 2.7 2.2 5 5 5h38c2.7 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5zm-1.6 43H8.6c-.9 0-1.6-.7-1.6-1.6V8.6C7 7.7 7.7 7 8.6 7h34.8c.9 0 1.6.7 1.6 1.6v34.8c0 .9-.7 1.6-1.6 1.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M21.9 11.9h-8.3c-.9 0-1.7.7-1.7 1.7v8.3c0 .9.7 1.7 1.7 1.7h8.3c.9 0 1.7-.7 1.7-1.7v-8.3c-.1-.9-.8-1.7-1.7-1.7zM38.4 11.9h-8.3c-.9 0-1.7.7-1.7 1.7v8.3c0 .9.7 1.7 1.7 1.7h8.3c.9 0 1.7-.7 1.7-1.7v-8.3c0-.9-.8-1.7-1.7-1.7zM21.9 28.5h-8.3c-.9 0-1.7.7-1.7 1.7v8.3c0 .9.7 1.7 1.7 1.7h8.3c.9 0 1.7-.7 1.7-1.7v-8.3c-.1-1-.8-1.7-1.7-1.7zM38.4 28.5h-8.3c-.9 0-1.7.7-1.7 1.7v8.3c0 .9.7 1.7 1.7 1.7h8.3c.9 0 1.7-.7 1.7-1.7v-8.3c0-1-.8-1.7-1.7-1.7z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (log_event_tmpl.stylesheets = []),
                empty_style_default.a &&
                    log_event_tmpl.stylesheets.push.apply(
                        log_event_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (log_event_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_log_event-host',
                    shadowAttribute: 'buildTemplates-action_log_event'
                });
            var manage_perm_sets = Object(engine_dom_cjs.registerTemplate)(
                manage_perm_sets_tmpl
            );
            function map_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.8 9.5L34.4 2.3c-.7-.3-1.5-.3-2.1 0L19 9 5.6 2.3c-.8-.4-1.8-.4-2.5.1-.7.4-1.1 1.2-1.1 2v36c0 .9.5 1.7 1.3 2.1l14.4 7.2c.7.3 1.5.3 2.1 0L33.2 43l13.3 6.7c.3.2.7.3 1.1.3.4 0 .9-.1 1.3-.4.7-.4 1.1-1.2 1.1-2v-36c0-.9-.4-1.7-1.2-2.1zM45 14.1v19c0 1.1-1 1.9-2 1.5-3.7-1.4-.7-7.6-3.4-11-2.5-3.1-5.7.1-8.8-4.8-2.9-4.7 1-8.1 4.6-9.9.5-.2 1-.2 1.4 0l7.4 3.7c.6.3.8.9.8 1.5zM24.9 41.9c-.6.3-1.3.2-1.8-.2-1-.9-1.8-2.3-1.8-3.7 0-2.4-4-1.6-4-6.4 0-3.9-4.6-4.9-8.5-4.5-1 .1-1.7-.6-1.7-1.6V10.9c0-1.2 1.2-2 2.2-1.4l8.6 4.3c.1 0 .2.1.2.1l.3.2c3.6 2.1 2.9 3.8 1.4 6.4-1.7 2.9-2.4 0-4.8-.8s-4.8.8-4 2.4 3.2 0 4.8 1.6 1.6 4 6.4 2.4 5.6-.8 7.2.8c1.6 1.6 2.4 4.8 0 7.2-1.4 1.4-2 4.4-2.6 6.4-.1.4-.4.8-.8 1l-1.1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (manage_perm_sets_tmpl.stylesheets = []),
                empty_style_default.a &&
                    manage_perm_sets_tmpl.stylesheets.push.apply(
                        manage_perm_sets_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (manage_perm_sets_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_manage_perm_sets-host',
                    shadowAttribute: 'buildTemplates-action_manage_perm_sets'
                });
            var map = Object(engine_dom_cjs.registerTemplate)(map_tmpl);
            function more_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M8 20c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm18 0c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm18 0c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (map_tmpl.stylesheets = []),
                empty_style_default.a &&
                    map_tmpl.stylesheets.push.apply(
                        map_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (map_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_map-host',
                    shadowAttribute: 'buildTemplates-action_map'
                });
            var more = Object(engine_dom_cjs.registerTemplate)(more_tmpl);
            function new_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M30 29h16.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H30c-.6 0-1-.4-1-1V5.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V22c0 .6-.4 1-1 1H5.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5H22c.6 0 1 .4 1 1v16.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V30c0-.6.4-1 1-1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (more_tmpl.stylesheets = []),
                empty_style_default.a &&
                    more_tmpl.stylesheets.push.apply(
                        more_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (more_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_more-host',
                    shadowAttribute: 'buildTemplates-action_more'
                });
            var action_new = Object(engine_dom_cjs.registerTemplate)(new_tmpl);
            function new_account_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 26.9c.1-1.7-1.2-2.2-1.7-2.2h-18c-1.6 0-1.8 1.7-1.8 1.8V46H50V26.9zm-12.4 14c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.5c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm8.3 8.5c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.5c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M33.4 17.9V8.2c.1-1.7-1.1-2.2-1.6-2.2h-28C2.2 6 2 7.7 2 7.8V46h21.5V21.6s0-2 1.8-2h6.5c1 0 1.6-1 1.6-1.7zM11.1 40.1c0 .9-.7 1.7-1.7 1.7H7.8c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.6c0 .9-.7 1.7-1.7 1.7H7.8c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.5c0 .9-.7 1.7-1.7 1.7H7.8c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7V23zm0-8.5c0 .9-.7 1.7-1.7 1.7H7.8c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm9.1 25.6c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.6c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm0-8.5c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7V23zm0-8.5c0 .9-.7 1.7-1.7 1.7h-1.7c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7zm9.1 0c0 .9-.7 1.7-1.7 1.7H26c-.9 0-1.7-.8-1.7-1.7v-1.7c0-.9.7-1.7 1.7-1.7h1.7c.9 0 1.7.8 1.7 1.7v1.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_tmpl.stylesheets.push.apply(
                        new_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new-host',
                    shadowAttribute: 'buildTemplates-action_new'
                });
            var new_account = Object(engine_dom_cjs.registerTemplate)(
                new_account_tmpl
            );
            function new_campaign_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 2C12.8 2 2 12.8 2 26s10.8 24 24 24 24-10.8 24-24S39.2 2 26 2zm0 42c-9.9 0-18-8.1-18-18S16.1 8 26 8s18 8.1 18 18-8.1 18-18 18z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 12c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 22c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 22c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_account_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_account_tmpl.stylesheets.push.apply(
                        new_account_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_account_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_account-host',
                    shadowAttribute: 'buildTemplates-action_new_account'
                });
            var new_campaign = Object(engine_dom_cjs.registerTemplate)(
                new_campaign_tmpl
            );
            function new_case_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M15 13h4c.6 0 1-.4 1-1v-2h12v2c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V9.5c0-3-2.5-5.5-5.5-5.5H19.4c-3 0-5.4 2.4-5.4 5.4V12c0 .6.4 1 1 1zM46 17H6c-2.2 0-4 1.8-4 4v23c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V21c0-2.2-1.8-4-4-4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_campaign_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_campaign_tmpl.stylesheets.push.apply(
                        new_campaign_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_campaign_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_campaign-host',
                    shadowAttribute: 'buildTemplates-action_new_campaign'
                });
            var new_case = Object(engine_dom_cjs.registerTemplate)(
                new_case_tmpl
            );
            function new_child_case_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M15 11h4c.6 0 1-.4 1-1V8h10v2c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V7.5c0-3-2.5-5.5-5.5-5.5H19.4c-3 0-5.4 2.4-5.4 5.4V10c0 .6.4 1 1 1zM32 34h2v-2c0-2.2 1.8-4 4-4h6c1.3 0 2.4.6 3.1 1.5.3.4.9.1.9-.3V19c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4v23c0 2.2 1.8 4 4 4h21.8c.4 0 .6-.3.5-.7-.2-.4-.3-.8-.3-1.3v-6c0-2.2 1.8-4 4-4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 38H44v-4.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V38h-4.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5H38v4.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V44h4.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_case_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_case_tmpl.stylesheets.push.apply(
                        new_case_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_case_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_case-host',
                    shadowAttribute: 'buildTemplates-action_new_case'
                });
            var new_child_case = Object(engine_dom_cjs.registerTemplate)(
                new_child_case_tmpl
            );
            function new_contact_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M1 14v24c0 2.8 2.2 5 5 5h40c2.7 0 5-2.3 5-5V14c0-2.8-2.3-5-5-5H6c-2.8 0-5 2.2-5 5zm23.6 19.8c.1-2.5 2.7-4.1 5.4-5.3 2-.7 2.2-1.5 2.2-2.3 0-.9-.5-1.6-1.2-2.2-1.1-.9-1.7-2.4-1.7-4.1 0-3.1 1.9-5.8 5.2-5.8s5.2 2.6 5.2 5.8c0 1.6-.6 3.1-1.7 4.1-.7.6-1.2 1.4-1.2 2.2s.3 1.6 2.2 2.4c2.7 1.2 5.3 2.7 5.4 5.2 0 1.7-1.2 3.4-2.8 3.4H27.2c-1.6 0-2.9-1.7-2.6-3.4zM7.7 28.9c0-1 .8-1.7 1.7-1.7h7.5c.9 0 1.7.8 1.7 1.7v2.5c0 1-.8 1.7-1.7 1.7H9.4c-.9 0-1.7-.8-1.7-1.7v-2.5zm-.1-6.6v-2.5c0-1 .8-1.7 1.7-1.7h12.5c.9 0 1.7.8 1.7 1.7v2.5c0 1-.8 1.7-1.7 1.7H9.4c-.9 0-1.7-.8-1.8-1.7z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_child_case_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_child_case_tmpl.stylesheets.push.apply(
                        new_child_case_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_child_case_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_child_case-host',
                    shadowAttribute: 'buildTemplates-action_new_child_case'
                });
            var new_contact = Object(engine_dom_cjs.registerTemplate)(
                new_contact_tmpl
            );
            function new_custom1_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M29.4 45.5c-1.9 2-5 2-6.9 0-5.8-6.1-16.8-17.7-16.8-17.8-5-5.1-5-13.6 0-18.8 2.4-2.5 5.6-3.9 9-3.9s6.6 1.3 9 3.9l1 1.2c.6.8 1.9.8 2.6 0l.8-1 .1-.1c2.5-2.6 5.7-4 9-4 3.4 0 6.6 1.3 9 3.9 5 5.1 5 13.6 0 18.8 0 .1-10.9 11.7-16.8 17.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_contact_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_contact_tmpl.stylesheets.push.apply(
                        new_contact_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_contact_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_contact-host',
                    shadowAttribute: 'buildTemplates-action_new_contact'
                });
            var new_custom1 = Object(engine_dom_cjs.registerTemplate)(
                new_custom1_tmpl
            );
            function new_custom10_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M42 48.3c-7.6 3-19.6 2.2-26.1-4.8C.1 26.6 13.9 2 32.9 2c3.2 0 6.2.6 9.1 1.8 1.2.5 1.3 2.1.3 2.8C36.2 10.9 32.1 18 32.1 26c0 8.1 4 15.2 10.1 19.5 1.1.7.9 2.3-.2 2.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom1_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom1_tmpl.stylesheets.push.apply(
                        new_custom1_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom1_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom1-host',
                    shadowAttribute: 'buildTemplates-action_new_custom1'
                });
            var new_custom10 = Object(engine_dom_cjs.registerTemplate)(
                new_custom10_tmpl
            );
            function new_custom100_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M35.5 41.5h-19c-.6 0-.9.5-.8 1.1.8 3.1 5.1 5.5 10.2 5.5 5.2 0 9.5-2.4 10.2-5.5.3-.6-.1-1.1-.6-1.1zM45.2 4H6.8C4.2 4 2 6.2 2 8.9v22.8c0 2.7 2.2 4.9 4.8 4.9h38.4c2.6 0 4.8-2.2 4.8-4.9V8.9C50 6.2 47.8 4 45.2 4zm0 26.1c0 .9-.7 1.6-1.6 1.6H8.4c-.9 0-1.6-.7-1.6-1.6V10.5c0-.9.7-1.6 1.6-1.6h35.2c.9 0 1.6.7 1.6 1.6v19.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom10_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom10_tmpl.stylesheets.push.apply(
                        new_custom10_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom10_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom10-host',
                    shadowAttribute: 'buildTemplates-action_new_custom10'
                });
            var new_custom100 = Object(engine_dom_cjs.registerTemplate)(
                new_custom100_tmpl
            );
            function new_custom11_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M27.8 3.1l6.4 13.5 14.2 2.2c1.6.2 2.2 2.3 1 3.4L39.1 32.8l2.4 14.8c.2 1.7-1.4 3-2.8 2.2l-12.7-7-12.7 7c-1.4.8-3.1-.5-2.8-2.2l2.4-14.8L2.6 22.2c-1.1-1.2-.5-3.2 1-3.4l14.2-2.2 6.4-13.5c.8-1.5 2.9-1.5 3.6 0z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom100_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom100_tmpl.stylesheets.push.apply(
                        new_custom100_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom100_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom100-host',
                    shadowAttribute: 'buildTemplates-action_new_custom100'
                });
            var new_custom11 = Object(engine_dom_cjs.registerTemplate)(
                new_custom11_tmpl
            );
            function new_custom12_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'circle',
                                    {
                                        attrs: { cx: '26', cy: '26', r: '24' },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom11_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom11_tmpl.stylesheets.push.apply(
                        new_custom11_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom11_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom11-host',
                    shadowAttribute: 'buildTemplates-action_new_custom11'
                });
            var new_custom12 = Object(engine_dom_cjs.registerTemplate)(
                new_custom12_tmpl
            );
            function new_custom13_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.2 4H6.8C4.2 4 2 6.1 2 8.7v4.7c0 .9.7 1.6 1.6 1.6h44.8c.9 0 1.6-.7 1.6-1.6V8.7C50 6.1 47.8 4 45.2 4zM45.2 19.7H6.8c-.9 0-1.6.7-1.6 1.6v22c0 2.6 2.2 4.7 4.8 4.7h32c2.6 0 4.8-2.1 4.8-4.7v-22c0-.9-.7-1.6-1.6-1.6zm-10.4 7.1c0 1.3-1 2.4-2.4 2.4H19.6c-1.3 0-2.4-1-2.4-2.4 0-1.3 1-2.4 2.4-2.4h12.8c1.4 0 2.4 1 2.4 2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom12_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom12_tmpl.stylesheets.push.apply(
                        new_custom12_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom12_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom12-host',
                    shadowAttribute: 'buildTemplates-action_new_custom12'
                });
            var new_custom13 = Object(engine_dom_cjs.registerTemplate)(
                new_custom13_tmpl
            );
            function new_custom14_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.4 11.7h-4.8c-1 0-2.1-.5-2.9-1.2l-3.8-3.3C36.1 6.5 35 6 34 6h-9.4c-1.2 0-2.3.5-3.2 1.4l-5 4.1c-.4.3-.4 1-.1 1.4l1.5 1.5c1 .8 2.4 1 3.4.2l4.4-2.7c.6-.4 1.4-.2 1.8.2l13.8 13.6c.3.3.6.8.6 1.3v3.6c0 1 .7 2 1.6 2h4.8c.9 0 1.6-.7 1.6-1.7V13.3c.2-1-.5-1.6-1.4-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M34.8 26.2l-8.6-8.5-2.4 1.5c-1.2.7-2.6 1.1-3.9 1.1-1.7 0-3.4-.6-4.8-1.8L11.9 16c-.7-.6-1.1-1.2-1.2-2.1-.2-.9-.8-1.4-1.6-1.4H3.6c-.9 0-1.6.5-1.6 1.4v14.7c0 1 .7 1.6 1.6 1.6h3.2c.2 0 .6-.9.9-1.3 1.2-1.6 3-2.5 4.9-2.8 1.9-.2 3.8.5 5.3 1.9l10 9.2c.9.8 1.5 1.7 1.9 2.8.2.6.9.7 1.3.3l3.8-3.8c1.9-1.9 3.4-6.5 1.6-8.6l-1.7-1.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M14.7 32.2c-1-1-2.6-.8-3.4.3-.9 1.1-.7 2.8.3 3.7l10 9.1c.5.5 1.1.6 1.8.6.6-.1 1.2-.4 1.6-1 .9-1.1.7-2.8-.3-3.7l-10-9z'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom13_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom13_tmpl.stylesheets.push.apply(
                        new_custom13_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom13_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom13-host',
                    shadowAttribute: 'buildTemplates-action_new_custom13'
                });
            var new_custom14 = Object(engine_dom_cjs.registerTemplate)(
                new_custom14_tmpl
            );
            function new_custom15_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M42 22.9c-2.8-1.2-3.2-2.2-3.2-3.4 0-1.2.8-2.2 1.8-3.1 1.7-1.5 2.6-3.6 2.6-6 0-4.5-2.8-8.4-7.9-8.4-4.3 0-7 2.9-7.7 6.6-.1.3.1.6.3.8 3.6 2.6 5.8 6.9 5.8 12.1 0 3.6-1.2 6.9-3.4 9.4-.3.4-.2 1 .3 1.3 1.4.6 3 1.4 4.6 2.2.5.3 1 .5 1.6.5H46c2.2 0 4-1.8 4-3.9v-.6c0-3.8-3.9-5.8-8-7.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27.7 36.1c-3.4-1.4-3.8-2.6-3.8-4s1-2.6 2.1-3.7c1.9-1.8 3-4.2 3-7 0-5.3-3.4-9.8-9.3-9.8s-9.3 4.6-9.3 9.8c0 2.9 1 5.3 3 7 1.1 1 2.1 2.3 2.1 3.7 0 1.4-.5 2.6-3.8 4-4.9 2-9.5 4.3-9.6 8.6v.7C2 47.9 4.2 50 6.9 50h25.6c2.6 0 4.8-2.1 4.8-4.6v-.7c-.1-4.3-4.7-6.6-9.6-8.6z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom14_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom14_tmpl.stylesheets.push.apply(
                        new_custom14_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom14_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom14-host',
                    shadowAttribute: 'buildTemplates-action_new_custom14'
                });
            var new_custom15 = Object(engine_dom_cjs.registerTemplate)(
                new_custom15_tmpl
            );
            function new_custom16_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M43.3 42h-.8V24.4c0-.9-.7-1.6-1.6-1.6h-1.6c-.9 0-1.6.7-1.6 1.6V42H33V24.4c0-.9-.7-1.6-1.6-1.6h-1.6c-.9 0-1.6.7-1.6 1.6V42h-4.7V24.4c0-.9-.7-1.6-1.6-1.6h-1.6c-.9 0-1.6.7-1.6 1.6V42H14V24.4c0-.9-.7-1.6-1.6-1.6h-1.6c-.9 0-1.6.7-1.6 1.6V42h-.5C6.1 42 4 44.2 4 46.8v1.6c0 .9.7 1.6 1.6 1.6h40.9c.9 0 1.6-.7 1.6-1.6v-1.6c-.1-2.6-2.2-4.8-4.8-4.8zM47.2 13.5L27.8 2.6c-.5-.4-1.2-.6-1.8-.6-.6 0-1.3.2-1.8.6L4.8 13.5c-.5.3-.8.8-.8 1.4v1.5c0 .9.7 1.6 1.6 1.6h40.9c.9 0 1.6-.7 1.6-1.6V15c-.1-.6-.4-1.2-.9-1.5zM26 14.8c-2.2 0-3.9-1.8-3.9-4s1.7-4 3.9-4 3.9 1.8 3.9 4-1.7 4-3.9 4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom15_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom15_tmpl.stylesheets.push.apply(
                        new_custom15_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom15_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom15-host',
                    shadowAttribute: 'buildTemplates-action_new_custom15'
                });
            var new_custom16 = Object(engine_dom_cjs.registerTemplate)(
                new_custom16_tmpl
            );
            function new_custom17_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M20.5 9.1c.2.6.8.9 1.4.9H30c.6 0 1.2-.3 1.4-.9l3.2-5.9c.2-.6-.2-1.1-.7-1.1H18.2c-.6 0-1 .6-.7 1.1l3 5.9zM30.7 14.8h-9.4C13.4 14.8 7 21.3 7 29.2v16c0 2.6 2.1 4.8 4.8 4.8h28.4c2.6 0 4.8-2.2 4.8-4.8v-16c0-7.9-6.5-14.4-14.3-14.4zm-2.3 26.9v2.7c0 .5-.5.8-1 .8h-3.2c-.5 0-.6-.3-.6-.8v-2.6c-2.4-.5-4.4-1.5-4.9-2-.6-.6-.8-1.1-.3-1.8l1-1.6c.2-.4.7-.6 1.2-.6.3 0 .6.1.8.2h.1c1.6 1 3 1.4 4 1.4 1.1 0 2-.6 2-1.2 0-.5-.3-1.3-3.3-2.3-2.7-1-6-2.6-6-6.3 0-2.2 1.4-4.7 5.4-5.5v-2.4c0-.5.2-.8.6-.8h3.2c.5 0 1 .3 1 .8V22c1.6.4 3.3 1.2 3.9 1.6.3.2.5.6.6 1 .1.4-.1.8-.3 1L31.4 27c-.3.4-.9.7-1.3.7-.2 0-.5-.1-.7-.2-1.6-.9-2.9-1.4-3.8-1.4-1.3 0-1.9.6-1.9 1 0 .6.3 1.2 3 2.2 3.3 1.1 7 2.9 7 6.7-.1 2.7-2.2 5-5.3 5.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom16_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom16_tmpl.stylesheets.push.apply(
                        new_custom16_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom16_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom16-host',
                    shadowAttribute: 'buildTemplates-action_new_custom16'
                });
            var new_custom17 = Object(engine_dom_cjs.registerTemplate)(
                new_custom17_tmpl
            );
            function new_custom18_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M31.4 15.3h8.2c.6 0 1.1-.5 1.1-1.1 0-.3-.1-.5-.3-.8L30.2 3.3c-.3-.2-.5-.3-.8-.3-.6 0-1.1.5-1.1 1.1v8.1c0 1.7 1.4 3.1 3.1 3.1zM49.5 25.7l-.9-.9c-.6-.6-1.5-.6-2.2 0L34.5 36.7c-.1.1 0 .2 0 .3v2.5c0 .2 0 .4.2.4h2.6c.1 0 .2-.1.3-.1L49.5 28c.7-.8.7-1.7 0-2.3z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M39.9 44.4H32.8c-1.6 0-2.9-1.3-2.9-2.9v-5.4c0-.8.2-1.6.9-2.1l9.5-9.5c.3-.3.5-.7.5-1.1v-2c0-.8-.7-1.5-1.5-1.5h-11c-2.6 0-4.6-2.1-4.6-4.6V4.5c0-.8-.7-1.5-1.6-1.5H6.6C4.1 3 2 5.1 2 7.6v36.8C2 46.9 4.1 49 6.6 49H36c2.2 0 4.2-1.6 4.6-3.7.1-.4-.3-.9-.7-.9zM8.2 16.8c0-.8.7-1.5 1.5-1.5h6.2c.9 0 1.5.7 1.5 1.5v1.5c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5v-1.5zm15.5 19.9c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5v-1.5c0-.8.7-1.5 1.5-1.5h12.4c.9 0 1.5.7 1.5 1.5v1.5zm3.1-9.2c0 .8-.7 1.5-1.5 1.5H9.7c-.9 0-1.5-.7-1.5-1.5V26c0-.8.7-1.5 1.5-1.5h15.5c.9 0 1.5.7 1.5 1.5v1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom17_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom17_tmpl.stylesheets.push.apply(
                        new_custom17_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom17_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom17-host',
                    shadowAttribute: 'buildTemplates-action_new_custom17'
                });
            var new_custom18 = Object(engine_dom_cjs.registerTemplate)(
                new_custom18_tmpl
            );
            function new_custom19_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M49.4 12.2c-.2-.6-.9-.7-1.4-.3L39.9 20c-.6.6-1.6.6-2.2 0L32 14.3c-.6-.6-.6-1.6 0-2.2L40.2 4c.4-.4.2-1.1-.3-1.4-1.4-.4-2.9-.6-4.3-.6-8.5 0-15.3 7.3-14.3 16 .2 1.4.5 2.6 1 3.8L3.6 40.4c-2.2 2.2-2.2 5.8 0 7.9 1.1 1.1 2.6 1.7 4 1.7s2.9-.6 4-1.7l18.6-18.6c1.2.5 2.5.8 3.8 1 8.7 1 16-5.8 16-14.3 0-1.5-.2-2.9-.6-4.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom18_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom18_tmpl.stylesheets.push.apply(
                        new_custom18_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom18_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom18-host',
                    shadowAttribute: 'buildTemplates-action_new_custom18'
                });
            var new_custom19 = Object(engine_dom_cjs.registerTemplate)(
                new_custom19_tmpl
            );
            function new_custom2_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M33.3 3.5C30.9 1.9 22.2.4 18.9 5.9c-1.6 2.6.3 7.3 1.8 10.3.4.7 1.2 1.1 2 .8 1-.4 2.2-.6 3.5-.6.8 0 1.6.1 2.4.3.7.2 1.4-.2 1.8-.8.6-1 1.5-2.2 3.1-3.5 3.8-3.3 2.2-7.3-.2-8.9zM29.1 35.1c-1 .3-2 .5-3.1.5-1 0-1.9-.2-2.8-.4-.7-.2-1.5.2-1.8.8-.6 1-1.5 2.3-3.1 3.6-4 3.2-2.4 7.3 0 8.9s11.2 3.1 14.4-2.4c1.5-2.6-.2-7.2-1.7-10.2-.4-.7-1.2-1-1.9-.8zM46.1 18.7c-2.6-1.6-7.3.3-10.3 1.8-.7.4-1.1 1.2-.8 2 .4 1 .6 2.2.6 3.5 0 .8-.1 1.6-.3 2.4-.2.7.2 1.4.8 1.8 1 .6 2.2 1.5 3.5 3.1 3.2 4 7.2 2.4 8.8 0s3.2-11.3-2.3-14.6zM16.9 29c-.3-1-.5-2-.5-3.1 0-1 .2-1.9.4-2.8.2-.7-.2-1.5-.8-1.8-1-.6-2.3-1.5-3.6-3.1-3.2-4-7.3-2.4-8.9 0S.4 29.3 5.9 32.6c2.6 1.5 7.2-.2 10.2-1.7.7-.4 1-1.2.8-1.9z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '26',
                                                cy: '26',
                                                r: '4.8'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom19_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom19_tmpl.stylesheets.push.apply(
                        new_custom19_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom19_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom19-host',
                    shadowAttribute: 'buildTemplates-action_new_custom19'
                });
            var new_custom2 = Object(engine_dom_cjs.registerTemplate)(
                new_custom2_tmpl
            );
            function new_custom20_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M16.4 24.2c0-.6-.8-1-1.3-.6L3.9 32.1C2.7 33 2 34.5 2 36v3.3c0 .6.6 1 1 .7l12.3-4.6c.6-.2 1-.8 1-1.5.1-.1.1-9.7.1-9.7zM34.1 46.5l-3.3-2.2V8.1c0-2.2-2.3-4.6-3.8-5.8-.6-.5-1.4-.5-2 0-1.4 1.2-3.8 3.6-3.8 5.8V44.4l-3.7 2.4c-.6.5-1.1 1.2-1.1 2v.5c0 .4.3.7.7.7h17.7c.4 0 .9-.3.9-.7-.1-1.2-.7-2.1-1.6-2.8zM48.1 32.1l-11.2-8.6c-.6-.4-1.3 0-1.3.6v9.8c0 .6.4 1.3 1 1.5L49 40.1c.6.2 1-.2 1-.7v-3.3c0-1.6-.7-3.1-1.9-4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom2_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom2_tmpl.stylesheets.push.apply(
                        new_custom2_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom2_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom2-host',
                    shadowAttribute: 'buildTemplates-action_new_custom2'
                });
            var new_custom20 = Object(engine_dom_cjs.registerTemplate)(
                new_custom20_tmpl
            );
            function new_custom21_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M32.1 42.9c-.2-.6-.8-.9-1.4-.9h-9.3c-.6 0-1.2.3-1.4.9l-2.2 5.9c-.2.6.2 1.1.7 1.1h15c.6 0 1-.6.7-1.1l-2.1-5.9zM45.2 2H6.8C4.2 2 2 4.1 2 6.8v25.6c0 2.6 2.2 4.8 4.8 4.8h38.4c2.6 0 4.8-2.2 4.8-4.8V6.8C50 4.1 47.8 2 45.2 2zM26 35.6c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4zm19.2-8c0 .9-.7 1.6-1.6 1.6H8.4c-.9 0-1.6-.7-1.6-1.6V8.4c0-.9.7-1.6 1.6-1.6h35.2c.9 0 1.6.7 1.6 1.6v19.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom20_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom20_tmpl.stylesheets.push.apply(
                        new_custom20_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom20_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom20-host',
                    shadowAttribute: 'buildTemplates-action_new_custom20'
                });
            var new_custom21 = Object(engine_dom_cjs.registerTemplate)(
                new_custom21_tmpl
            );
            function new_custom22_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.1 37.1l-5-4c-1.7-1.4-4.1-1.4-5.8-.2l-4.7 3.4c-.6.5-1.5.4-2.1-.2l-7.8-7-7.1-7.8c-.6-.6-.6-1.4-.2-2.1l3.4-4.7c1.3-1.8 1.2-4.2-.2-5.8l-4-5C13 1.5 9.7 1.3 7.7 3.3L3.4 7.7C2.4 8.7 2 10 2 11.3 2.6 21.5 7.2 31.2 14 38s16.4 11.4 26.6 12c1.4.1 2.6-.5 3.6-1.4l4.3-4.3c2.1-2.1 1.9-5.4-.4-7.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom21_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom21_tmpl.stylesheets.push.apply(
                        new_custom21_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom21_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom21-host',
                    shadowAttribute: 'buildTemplates-action_new_custom21'
                });
            var new_custom22 = Object(engine_dom_cjs.registerTemplate)(
                new_custom22_tmpl
            );
            function new_custom23_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M25 30.6c.6.6 1.5.6 2.2 0L49.8 10c.4-.8.3-2-1.3-2H3.7c-1.2 0-2.2 1.2-1.3 2.1L25 30.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 18.8c0-1-1.3-1.6-2-.9L30.4 34c-1.2 1.1-2.7 1.7-4.3 1.7-1.6 0-3.1-.6-4.3-1.7L4.1 18c-.8-.7-2-.2-2 .9v20.4c0 2.6 2.2 4.7 4.8 4.7h38.4c2.6 0 4.8-2.1 4.8-4.7-.1 0-.1-14.2-.1-20.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom22_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom22_tmpl.stylesheets.push.apply(
                        new_custom22_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom22_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom22-host',
                    shadowAttribute: 'buildTemplates-action_new_custom22'
                });
            var new_custom23 = Object(engine_dom_cjs.registerTemplate)(
                new_custom23_tmpl
            );
            function new_custom24_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M40.3 2H11.7C9.1 2 7 4.2 7 6.7v.1c0 .9.7 1.6 1.6 1.6h34.8c.9 0 1.6-.7 1.6-1.6v-.1C45 4.2 42.9 2 40.3 2zM40.2 13.2H11.8c-.9 0-1.6.7-1.6 1.6v33.6c0 .9.7 1.6 1.6 1.6h8.8c.9 0 1.5-.7 1.5-1.6V42c0-.9.8-1.6 1.7-1.6h4.6c.9 0 1.7.7 1.7 1.6v6.4c0 .9.6 1.6 1.5 1.6h8.8c.9 0 1.6-.7 1.6-1.6V14.8c-.2-.9-.9-1.6-1.8-1.6zM23.6 34.8c0 .9-.7 1.6-1.6 1.6h-3.2c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6H22c.9 0 1.6.7 1.6 1.6v3.2zm0-11.2c0 .9-.7 1.6-1.6 1.6h-3.2c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6H22c.9 0 1.6.7 1.6 1.6v3.2zm11.1 11.2c0 .9-.7 1.6-1.6 1.6H30c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2zm0-11.2c0 .9-.7 1.6-1.6 1.6H30c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom23_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom23_tmpl.stylesheets.push.apply(
                        new_custom23_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom23_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom23-host',
                    shadowAttribute: 'buildTemplates-action_new_custom23'
                });
            var new_custom24 = Object(engine_dom_cjs.registerTemplate)(
                new_custom24_tmpl
            );
            function new_custom25_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49.8 7.8c-.6-3-3-5.4-6.1-5.8-2.2-.3-4.2.4-5.7 1.6-.5.4-.4 1 .2 1.4 3.7 1.9 6.8 4.7 9.2 8.1.3.5 1 .5 1.4 0 1-1.5 1.4-3.3 1-5.3zM13.7 5c.5-.2.6-1 .2-1.4-1.5-1.3-3.5-1.9-5.7-1.6-3 .4-5.5 2.8-6.1 5.8-.3 1.9.1 3.8 1 5.2.3.5 1 .5 1.4 0 2.4-3.2 5.5-6 9.2-8zM26 6.8c-11.9 0-21.6 9.7-21.6 21.6 0 4.8 1.6 9.3 4.2 12.8l-3.3 3.3c-1.3 1.3-1.3 3.3 0 4.6.6.6 1.4 1 2.2 1s1.6-.3 2.2-1l3.3-3.3c3.7 2.6 8.2 4.2 13 4.2s9.3-1.6 12.8-4.2l3.3 3.3c.7.6 1.5 1 2.3 1s1.6-.3 2.2-1c1.3-1.3 1.3-3.3 0-4.6l-3.3-3.3c2.6-3.5 4.2-8 4.2-12.8.1-11.9-9.6-21.6-21.5-21.6zM10.8 28.4c0-8.4 6.8-15.2 15.2-15.2S41.2 20 41.2 28.4 34.4 43.6 26 43.6s-15.2-6.8-15.2-15.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M28.4 27.4v-6.2c0-1.4-1-2.4-2.4-2.4s-2.4 1-2.4 2.4v7.2c0 .6.2 1.3.7 1.7l5.6 5.6c.5.5 1.1.7 1.7.7s1.2-.2 1.7-.7c1-1 1-2.5 0-3.4l-4.9-4.9z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom24_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom24_tmpl.stylesheets.push.apply(
                        new_custom24_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom24_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom24-host',
                    shadowAttribute: 'buildTemplates-action_new_custom24'
                });
            var new_custom25 = Object(engine_dom_cjs.registerTemplate)(
                new_custom25_tmpl
            );
            function new_custom26_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M6.8 2C4.2 2 2 4.2 2 6.8c0 1.4.6 2.7 1.6 3.6v36.4C3.6 48.6 5 50 6.8 50c1.8 0 3.2-1.4 3.2-3.2V10.4c1-.9 1.6-2.2 1.6-3.6C11.6 4.2 9.4 2 6.8 2zM48.8 10.6c-12.6 6.6-21.1-4.7-33-.4-.6.2-1 .8-1 1.5v20.6c0 1 1 1.8 2.1 1.5 11.4-3.4 19.9 7.3 32.3.5.5-.2.8-.8.8-1.4V11.4c0-.7-.6-1.1-1.2-.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom25_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom25_tmpl.stylesheets.push.apply(
                        new_custom25_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom25_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom25-host',
                    shadowAttribute: 'buildTemplates-action_new_custom25'
                });
            var new_custom26 = Object(engine_dom_cjs.registerTemplate)(
                new_custom26_tmpl
            );
            function new_custom27_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M6.5 35.6h39c.8 0 1.5-.7 1.5-1.5V10.4C47 8 45 6 42.5 6h-33C7 6 5 8 5 10.4v23.7c0 .9.7 1.5 1.5 1.5zm3-23.7c0-.8.7-1.5 1.5-1.5h30c.8 0 1.5.7 1.5 1.5v17.8c0 .8-.7 1.5-1.5 1.5H11c-.8 0-1.5-.7-1.5-1.5V11.9zM48.5 40.1H32c-.8 0-1.5.7-1.5 1.5s-.7 1.5-1.5 1.5h-6c-.8 0-1.5-.7-1.5-1.5s-.7-1.5-1.5-1.5H3.5c-.8 0-1.5.7-1.5 1.5C2 44 4 46 6.5 46h39c2.5 0 4.5-2 4.5-4.4 0-.9-.7-1.5-1.5-1.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom26_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom26_tmpl.stylesheets.push.apply(
                        new_custom26_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom26_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom26-host',
                    shadowAttribute: 'buildTemplates-action_new_custom26'
                });
            var new_custom27 = Object(engine_dom_cjs.registerTemplate)(
                new_custom27_tmpl
            );
            function new_custom28_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M37.2 2H14.8C12.2 2 10 4.2 10 6.8v38.4c0 2.6 2.2 4.8 4.8 4.8h22.4c2.6 0 4.8-2.2 4.8-4.8V6.8C42 4.2 39.8 2 37.2 2zM26 48.4c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4zm11.2-8c0 .9-.7 1.6-1.6 1.6H16.4c-.9 0-1.6-.7-1.6-1.6V10c0-.9.7-1.6 1.6-1.6h19.2c.9 0 1.6.7 1.6 1.6v30.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom27_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom27_tmpl.stylesheets.push.apply(
                        new_custom27_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom27_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom27-host',
                    shadowAttribute: 'buildTemplates-action_new_custom27'
                });
            var new_custom28 = Object(engine_dom_cjs.registerTemplate)(
                new_custom28_tmpl
            );
            function new_custom29_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.3 8.4h-1.5c-1 0-1.7.8-1.7 1.8V42c0 .1 0 .2.1.3l2 2.8c.2.2.4.2.6 0l2-2.8c.2-.1.2-.1.2-.3V10.2c0-1-.7-1.8-1.7-1.8zM32.5 2H9.8C7.2 2 5 4.2 5 6.8v38.4C5 47.8 7.2 50 9.8 50h22.6c2.7 0 4.8-2.2 4.8-4.8V6.8c.1-2.6-2.1-4.8-4.7-4.8zM21.2 48.4c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1.1 2.4-2.4 2.4zm11.3-8c0 .9-.7 1.6-1.6 1.6H11.5c-.9 0-1.6-.7-1.6-1.6V10c0-.9.7-1.6 1.6-1.6h19.4c.9 0 1.6.7 1.6 1.6v30.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom28_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom28_tmpl.stylesheets.push.apply(
                        new_custom28_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom28_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom28-host',
                    shadowAttribute: 'buildTemplates-action_new_custom28'
                });
            var new_custom29 = Object(engine_dom_cjs.registerTemplate)(
                new_custom29_tmpl
            );
            function new_custom3_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 16.4c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 26c0-2.8-6.7-4.2-7.8-6.7-1-2.6 2.7-8.3.8-10.3s-7.7 1.8-10.2.7c-2.6-1-4-7.7-6.8-7.7s-4.2 6.7-6.7 7.8C16.7 10.8 11 7.1 9 9s1.8 7.7.7 10.2c-1 2.6-7.7 4-7.7 6.8s6.7 4.2 7.8 6.7c1 2.6-2.7 8.3-.8 10.3 1.9 1.9 7.7-1.8 10.2-.7 2.5 1 3.9 7.8 6.7 7.8s4.2-6.7 6.7-7.8c2.6-1 8.3 2.6 10.2.7 1.9-1.9-1.8-7.7-.7-10.2 1.2-2.6 7.9-4 7.9-6.8zM26 40.4c-7.9 0-14.4-6.5-14.4-14.4S18.1 11.6 26 11.6 40.4 18.1 40.4 26 33.9 40.4 26 40.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom29_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom29_tmpl.stylesheets.push.apply(
                        new_custom29_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom29_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom29-host',
                    shadowAttribute: 'buildTemplates-action_new_custom29'
                });
            var new_custom3 = Object(engine_dom_cjs.registerTemplate)(
                new_custom3_tmpl
            );
            function new_custom30_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M43.2 8.8C38.8 4.4 32.9 2 26.8 2c-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4c4.9 0 9.5 1.9 13.1 5.4 3.4 3.5 5.4 8.2 5.4 13.1 0 1.4 1 2.4 2.4 2.4s2.4-1 2.4-2.4c-.1-6.2-2.5-12.1-6.9-16.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26.8 11.6c-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4c2.3 0 4.6.9 6.3 2.6 1.7 1.7 2.6 3.8 2.6 6.3 0 1.4 1 2.4 2.4 2.4s2.4-1 2.4-2.4c0-3.6-1.4-7.1-4-9.6-2.7-2.6-6.1-4.1-9.7-4.1zM23.3 34.6l2.1-5.6c1.4.6 3 .2 4.2-.9 1.6-1.6 1.6-4.1 0-5.7-1.6-1.6-4.1-1.6-5.7 0-1.2 1.2-1.4 3-.8 4.5l-5.2 2.3-9.4-9.4c-.6-.6-1.8-.6-2.3.1-6 7.2-5.6 18 1.2 24.7 6.7 6.7 17.5 7.1 24.7 1.2.7-.6.7-1.7.1-2.3l-8.9-8.9z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom3_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom3_tmpl.stylesheets.push.apply(
                        new_custom3_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom3_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom3-host',
                    shadowAttribute: 'buildTemplates-action_new_custom3'
                });
            var new_custom30 = Object(engine_dom_cjs.registerTemplate)(
                new_custom30_tmpl
            );
            function new_custom31_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M46.4 20.7l-3.9-12C41.8 6.5 39.6 5 37.2 5H14.8c-2.4 0-4.6 1.5-5.4 3.7l-3.8 12C3.5 21.3 2 23 2 25.2v9.3c0 2 1.4 3.7 3.2 4.4v6.5c0 .9.7 1.6 1.6 1.6h6.4c.9 0 1.6-.7 1.6-1.6v-6.2h22.4v6.2c0 .9.7 1.6 1.6 1.6h6.4c.9 0 1.6-.7 1.6-1.6V39c1.8-.6 3.2-2.3 3.2-4.4v-9.3c0-2.3-1.5-4-3.6-4.6zM10 33.8c-2.2 0-4-1.7-4-3.9S7.8 26 10 26s4 1.7 4 3.9-1.8 3.9-4 3.9zm17.6-13.2H11.8c-.6 0-1-.5-.8-1l3-9.3c.1-.3.4-.5.7-.5h22.4c.3 0 .6.2.7.5l3 9.4c.2.5-.2 1-.8 1H27.6zm13.6 13.2c-2.2 0-4-1.7-4-3.9s1.8-3.9 4-3.9 4 1.7 4 3.9-1.8 3.9-4 3.9z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom30_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom30_tmpl.stylesheets.push.apply(
                        new_custom30_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom30_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom30-host',
                    shadowAttribute: 'buildTemplates-action_new_custom30'
                });
            var new_custom31 = Object(engine_dom_cjs.registerTemplate)(
                new_custom31_tmpl
            );
            function new_custom32_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.8 14.2L30.1 24.9c-.4.2-.8.3-1.2.3-.9 0-1.8-.5-2.2-1.4-.6-1.1 0-2.6 1.1-3.2l6.2-3.5V11c0-.6-.6-1-1.2-.7L10 23.3c-.4.2-.8.3-1.2.3-.8 0-1.7-.4-2.1-1.2-.6-1.1-.2-2.6.9-3.3l3.9-2.2V3.6c.1-.9-.6-1.6-1.5-1.6H3.6C2.7 2 2 2.7 2 3.6v41.6C2 47.8 4.2 50 6.8 50H20.4c.9 0 1.6-.7 1.6-1.6v-5.6c0-.9.7-1.6 1.6-1.6h4.8c.9 0 1.6.7 1.6 1.6v5.6c0 .9.7 1.6 1.6 1.6h13.6c2.6 0 4.8-2.2 4.8-4.8V15c0-.7-.6-1.1-1.2-.8zM14 36.4c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-4.8c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v4.8zm9.6 0c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-4.8c0-.9.7-1.6 1.6-1.6H22c.9 0 1.6.7 1.6 1.6v4.8zm9.6 0c0 .9-.7 1.6-1.6 1.6H30c-.9 0-1.6-.7-1.6-1.6v-4.8c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v4.8zm9.6 0c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-4.8c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v4.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom31_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom31_tmpl.stylesheets.push.apply(
                        new_custom31_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom31_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom31-host',
                    shadowAttribute: 'buildTemplates-action_new_custom31'
                });
            var new_custom32 = Object(engine_dom_cjs.registerTemplate)(
                new_custom32_tmpl
            );
            function new_custom33_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M37.2 19.3H15.5c-.8 0-1.5.7-1.5 1.5v5.9c0 .8.7 1.5 1.5 1.5h21.8c.8 0 1.5-.7 1.5-1.5v-5.9c0-.8-.7-1.5-1.6-1.5zM26.8 26c-1.3 0-2.2-1-2.2-2.2 0-1.3 1-2.2 2.2-2.2s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 9h-45C2.7 9 2 9.7 2 10.5V12c0 1.6 1.3 3 3 3v26.6c0 .7.7 1.4 1.5 1.4H8c.8 0 1.5-.7 1.5-1.5V14.9h33.8v26.6c0 .8.7 1.5 1.5 1.5h1.5c.8 0 1.5-.7 1.5-1.5V14.9H47c1.6 0 3-1.3 3-3v-1.5c0-.7-.7-1.4-1.5-1.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom32_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom32_tmpl.stylesheets.push.apply(
                        new_custom32_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom32_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom32-host',
                    shadowAttribute: 'buildTemplates-action_new_custom32'
                });
            var new_custom33 = Object(engine_dom_cjs.registerTemplate)(
                new_custom33_tmpl
            );
            function new_custom34_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M19.6 10h12.8c.9 0 1.6-.9 1.4-1.8C33 4.7 29.8 2 26 2s-7 2.7-7.8 6.2c-.2.9.5 1.8 1.4 1.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.6 30.8c1.4 0 2.5-1.1 2.4-2.6-.1-1.2-1.2-2.2-2.6-2.2h-7v-4c4.6-1.8 7.9-6.8 8-12.7 0-1.2-.8-2.2-2-2.5-1.5-.2-2.8.9-2.8 2.4 0 3.4-1.6 6.4-3.9 7.8-.9-1.4-2.4-2.2-4.1-2.2H16.4c-1.7 0-3.2.9-4.1 2.2-2.3-1.4-3.9-4.3-3.9-7.7 0-1.3-1-2.5-2.2-2.6-1.4-.1-2.6 1-2.6 2.4 0 5.9 3.4 11 8 12.8v4h-7c-1.3 0-2.5 1-2.6 2.2-.1 1.4 1 2.6 2.4 2.6h7.2v4c-4.6 1.8-7.9 6.8-8 12.7 0 1.2.8 2.2 2 2.5 1.5.2 2.8-.9 2.8-2.4 0-3.4 1.5-6.3 3.8-7.8 1.4 4.5 4.9 8 9.3 9.4 1 .3 2.1-.5 2.1-1.5v-19c0-1.3 1-2.5 2.2-2.6 1.4-.1 2.6 1 2.6 2.4v19.3c0 1.1 1 1.8 2.1 1.5 4.4-1.4 7.9-5 9.3-9.4 2.2 1.4 3.8 4.3 3.8 7.6 0 1.3 1 2.5 2.2 2.6 1.4.1 2.6-1 2.6-2.4 0-5.9-3.4-11-8-12.8v-4h7.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom33_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom33_tmpl.stylesheets.push.apply(
                        new_custom33_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom33_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom33-host',
                    shadowAttribute: 'buildTemplates-action_new_custom33'
                });
            var new_custom34 = Object(engine_dom_cjs.registerTemplate)(
                new_custom34_tmpl
            );
            function new_custom35_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M41.5 18c-1.4 0-2.5 1-2.5 2.4v4c0 7-5.9 12.8-13.1 12.8s-13.1-5.8-13.1-12.8v-4c0-1.4-1.1-2.4-2.5-2.4S8 19 8 20.4v4c0 8.9 6.8 16.2 15.5 17.4v3.4h-4.1c-1.4 0-2.5 1-2.5 2.4S18 50 19.4 50h13.1c1.4 0 2.5-1 2.5-2.4s-1.1-2.4-2.5-2.4h-4.1v-3.4C37.2 40.6 44 33.3 44 24.4v-4c0-1.4-1.1-2.4-2.5-2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 32.4c4.5 0 8.2-3.6 8.2-8V9.9c0-4.4-3.6-7.9-8.1-7.9h-.2c-4.5 0-8.1 3.5-8.1 7.9v14.5c0 4.4 3.7 8 8.2 8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom34_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom34_tmpl.stylesheets.push.apply(
                        new_custom34_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom34_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom34-host',
                    shadowAttribute: 'buildTemplates-action_new_custom34'
                });
            var new_custom35 = Object(engine_dom_cjs.registerTemplate)(
                new_custom35_tmpl
            );
            function new_custom36_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M17.2 43.6H14c-.5 0-1.1.3-1.3.8l-1.1 1.9c-.6 1.1-.4 2.6.6 3.3.4.3.9.4 1.3.4.8 0 1.6-.4 2-1.2l2.3-4c.4-.6 0-1.2-.6-1.2zM39.4 44.4c-.3-.5-.8-.8-1.3-.8h-3.2c-.6 0-1 .6-.7 1.2l2.3 4c.5.8 1.3 1.2 2 1.2.5 0 .9-.2 1.3-.4 1-.7 1.3-2.2.6-3.3l-1-1.9zM39.3 2H12.7C10.1 2 8 4.2 8 6.8V34c0 2.6 2.1 4.8 4.7 4.8h26.6c2.6 0 4.7-2.2 4.7-4.8V6.8C44 4.2 41.9 2 39.3 2zM15 35.6c-1.3 0-2.3-1-2.3-2.4s1-2.4 2.3-2.4 2.3 1 2.3 2.4-.9 2.4-2.3 2.4zm22 0c-1.3 0-2.3-1-2.3-2.4s1-2.4 2.3-2.4 2.3 1 2.3 2.4-1 2.4-2.3 2.4zm2.3-9.6c0 .9-.7 1.6-1.6 1.6H14.3c-.9 0-1.6-.7-1.6-1.6V10c0-.9.7-1.6 1.6-1.6h23.5c.9 0 1.6.7 1.6 1.6v16z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom35_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom35_tmpl.stylesheets.push.apply(
                        new_custom35_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom35_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom35-host',
                    shadowAttribute: 'buildTemplates-action_new_custom35'
                });
            var new_custom36 = Object(engine_dom_cjs.registerTemplate)(
                new_custom36_tmpl
            );
            function new_custom37_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.5 30.5h-9.7v-8.8c2 1.7 4.6 2.8 7.5 2.8 1.3 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2c-4.1 0-7.5-3.7-7.5-8.2V9.5c.8 0 1.5-.7 1.5-1.5V6.5c0-.8-.7-1.5-1.5-1.5h-4.5c-.8 0-1.5.7-1.5 1.5V8c0 .8.7 1.5 1.5 1.5v2.2c0 4.6-3.7 8.2-8.2 8.2s-8.2-3.7-8.2-8.2V9.5c.8 0 1.5-.7 1.5-1.5V6.5c0-.8-.7-1.5-1.5-1.5h-4.5c-.8 0-1.5.7-1.5 1.5V8c0 .8.7 1.5 1.5 1.5v2.2c0 4.6-3.4 8.2-7.5 8.2-1.3 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2c2.8 0 5.5-1.1 7.5-2.8v8.8H3.5c-.8.2-1.5.9-1.5 1.7v3.6c0 .8.7 1.7 1.5 1.7h3v8.1c0 .8.7 1.6 1.5 1.6h4.5c.8 0 1.5-.8 1.5-1.6v-3c0-2.5 2-4.4 4.5-4.4h15c2.5 0 4.5 1.9 4.5 4.4v3c0 .8.7 1.6 1.5 1.6H44c.8 0 1.5-.8 1.5-1.6v-8.1h3c.8 0 1.5-.8 1.5-1.7V32c0-.8-.7-1.5-1.5-1.5zm-30.7-9.1c2.2 1.9 5.1 3.1 8.2 3.1s6-1.1 8.2-3.1v9.1H17.8v-9.1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom36_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom36_tmpl.stylesheets.push.apply(
                        new_custom36_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom36_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom36-host',
                    shadowAttribute: 'buildTemplates-action_new_custom36'
                });
            var new_custom37 = Object(engine_dom_cjs.registerTemplate)(
                new_custom37_tmpl
            );
            function new_custom38_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 22c-3.5 0-6.4 2.9-6.4 6.4s2.9 6.4 6.4 6.4 6.4-2.9 6.4-6.4S29.5 22 26 22z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.2 14h-6.5c-.6 0-1.2-.3-1.4-1l-2.1-4.4C34.4 7 32.7 6 30.9 6h-9.8c-1.8 0-3.5 1-4.3 2.6L14.7 13c-.2.6-.8 1-1.4 1H6.8C4.2 14 2 16.2 2 18.8v22.4C2 43.8 4.2 46 6.8 46h38.4c2.6 0 4.8-2.2 4.8-4.8V18.8c0-2.6-2.2-4.8-4.8-4.8zM26 39.8c-6.2 0-11.2-5-11.2-11.2s5-11.2 11.2-11.2 11.2 5 11.2 11.2-5 11.2-11.2 11.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom37_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom37_tmpl.stylesheets.push.apply(
                        new_custom37_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom37_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom37-host',
                    shadowAttribute: 'buildTemplates-action_new_custom37'
                });
            var new_custom38 = Object(engine_dom_cjs.registerTemplate)(
                new_custom38_tmpl
            );
            function new_custom39_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M36.9 8.9c-.2-.6-.9-1-1.5-.9L3.1 18.4c-.8.2-1.2 1.1-1 1.9l1.3 5c.2.8 1 1.4 1.8 1.2l8.2-1.1c.2.9.6 1.8 1.2 2.5l-7 18.9c-.5 1.2.1 2.6 1.4 3 .2.1.6.2.8.2 1 0 1.9-.6 2.2-1.6l6.6-17.9c.6.2 1 .2 1.6.2s1.1-.1 1.6-.2l6.6 17.9c.3 1 1.3 1.6 2.2 1.6.2 0 .6-.1.8-.2 1.3-.5 1.9-1.8 1.4-3.1l-7-19c.9-1.2 1.4-2.7 1.4-4.3v-.1l11.3-1.6c.7-.1 1.2-.8 1-1.5L36.9 8.9zM49.9 20.2L45.5 3.8c-.3-1.3-1.7-2.1-3-1.8-1.3.3-2.1 1.7-1.8 3l4.4 16.3c.3 1.3 1.7 2.1 3 1.8 1.3-.3 2.1-1.7 1.8-2.9z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom38_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom38_tmpl.stylesheets.push.apply(
                        new_custom38_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom38_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom38-host',
                    shadowAttribute: 'buildTemplates-action_new_custom38'
                });
            var new_custom39 = Object(engine_dom_cjs.registerTemplate)(
                new_custom39_tmpl
            );
            function new_custom4_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M6.6 12.2l16.9-9.5c1.5-.9 3.5-.9 5.1 0l16.9 9.5c1.5.9 2.5 2.6 2.5 4.3v19c0 1.8-.9 3.4-2.5 4.3l-16.9 9.5c-1.5.9-3.5.9-5.1 0L6.6 39.8C5.1 38.9 4 37.3 4 35.5v-19c0-1.8 1.1-3.4 2.6-4.3z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom39_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom39_tmpl.stylesheets.push.apply(
                        new_custom39_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom39_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom39-host',
                    shadowAttribute: 'buildTemplates-action_new_custom39'
                });
            var new_custom4 = Object(engine_dom_cjs.registerTemplate)(
                new_custom4_tmpl
            );
            function new_custom40_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.2 8H6.8C4.2 8 2 10.1 2 12.7v26.6C2 41.9 4.2 44 6.8 44h38.4c2.6 0 4.8-2.1 4.8-4.7V12.7c0-2.6-2.2-4.7-4.8-4.7zm0 4.7v4.7H6.8v-4.7h38.4zM6.8 39.3V25.2h38.4v14.1H6.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M20.5 29.1c-1.1 0-2.1.5-2.6 1.4-.1.2-.3.2-.4 0-.6-.9-1.5-1.4-2.6-1.4-1.8 0-3.2 1.4-3.2 3.1 0 1.7 1.4 3.1 3.2 3.1 1.1 0 2.1-.5 2.6-1.4.1-.2.3-.2.4 0 .6.9 1.5 1.4 2.6 1.4h.1c1.7 0 3.1-1.3 3.1-3.1V32c-.1-1.5-1.5-2.9-3.2-2.9zM38.8 29.9h-9.6c-.9 0-1.6.7-1.6 1.6V33c0 .9.7 1.6 1.6 1.6h9.6c.9 0 1.6-.7 1.6-1.6v-1.6c0-.8-.7-1.5-1.6-1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom4_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom4_tmpl.stylesheets.push.apply(
                        new_custom4_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom4_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom4-host',
                    shadowAttribute: 'buildTemplates-action_new_custom4'
                });
            var new_custom40 = Object(engine_dom_cjs.registerTemplate)(
                new_custom40_tmpl
            );
            function new_custom41_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45.5 11h-39C4 11 2 13 2 15.4v21.2C2 39 4 41 6.5 41h39c2.5 0 4.5-2 4.5-4.4V15.4c0-2.4-2-4.4-4.5-4.4zM11.8 36.6c0-2.9-2.3-5.1-5.2-5.1v-11c2.9 0 5.2-2.3 5.2-5.1h28.5c0 2.9 2.3 5.1 5.2 5.1v11c-2.9 0-5.2 2.3-5.2 5.1H11.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'ellipse',
                                    {
                                        attrs: {
                                            cx: '26',
                                            cy: '25.6',
                                            rx: '7.5',
                                            ry: '7.3'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom40_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom40_tmpl.stylesheets.push.apply(
                        new_custom40_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom40_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom40-host',
                    shadowAttribute: 'buildTemplates-action_new_custom40'
                });
            var new_custom41 = Object(engine_dom_cjs.registerTemplate)(
                new_custom41_tmpl
            );
            function new_custom42_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.2 4H6.8C4.2 4 2 6.1 2 8.7v4.7c0 .9.7 1.6 1.6 1.6h44.8c.9 0 1.6-.7 1.6-1.6V8.7C50 6.1 47.8 4 45.2 4zM45.2 19.7H6.8c-.9 0-1.6.7-1.6 1.6v22c0 2.6 2.2 4.7 4.8 4.7h32c2.6 0 4.8-2.1 4.8-4.7v-22c0-.9-.7-1.6-1.6-1.6zm-10.4 7.1c0 1.3-1 2.4-2.4 2.4H19.6c-1.3 0-2.4-1-2.4-2.4 0-1.3 1-2.4 2.4-2.4h12.8c1.4 0 2.4 1 2.4 2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom41_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom41_tmpl.stylesheets.push.apply(
                        new_custom41_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom41_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom41-host',
                    shadowAttribute: 'buildTemplates-action_new_custom41'
                });
            var new_custom42 = Object(engine_dom_cjs.registerTemplate)(
                new_custom42_tmpl
            );
            function new_custom43_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M49.8 21.2s.1 0 0 0c.1-.2.1-.3.1-.4v-.1-.5-.3-.1s-.1-.1-.1-.2 0-.1-.1-.1c0-.1-.1-.1-.1-.2s-.1-.1-.1-.1L40.8 6.9c-.4-.5-1-.9-1.7-.9H12.9c-.7 0-1.4.4-1.8.9L2.3 19.1c0 .1-.1.1-.1.1-.1.1-.1.1-.1.2s0 .1-.1.1c0 .1-.1.1-.1.2V20.7c0 .1.1.3.1.4v.1c.1.1.1.2.1.3 0 .1.1.1.1.1l.1.1 21.9 23.6.1.1.1.1.1.1s.1 0 .1.1c.1 0 .1.1.1.1s.1 0 .1.1c0 0 .1 0 .1.1 0 0 .1 0 .1.1H26.6s.1 0 .1-.1c0 0 .1 0 .1-.1 0 0 .1 0 .1-.1 0 0 .1 0 .1-.1.1 0 .1-.1.1-.1s.1 0 .1-.1l.1-.1.1-.1.1-.1 21.9-23.6.1-.1c0-.1.1-.1.1-.1.1 0 .2-.1.2-.2zm-23.8-3h-3.5l3.5-5.8 3.5 5.8H26zm0 4.3h4.4L26 36.6l-4.4-14.1H26zm3.8-12.2h5.5l-2 5.7-3.5-5.7zm-11 5.7l-2-5.7h5.5L18.8 16zm-1.7 6.5l4 13-12-13h8zm17.8 0h8l-12 13 4-13zm8.7-4.3H37l2.2-6.1 4.4 6.1zm-30.9-6.1l2.2 6.1H8.4l4.3-6.1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom42_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom42_tmpl.stylesheets.push.apply(
                        new_custom42_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom42_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom42-host',
                    shadowAttribute: 'buildTemplates-action_new_custom42'
                });
            var new_custom43 = Object(engine_dom_cjs.registerTemplate)(
                new_custom43_tmpl
            );
            function new_custom44_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M40.7 9.1C36.6 3.8 33.2 2 26 2c-3.2 0-7.1 1.3-8.7 1.6 0-.9-.7-1.6-1.6-1.6h-3.2c-.9 0-1.6.7-1.6 1.6V10c0 .9.7 1.6 1.6 1.6h3.1c.9 0 1.6-.7 1.6-1.6H19c1.3 0 2.3 1 2.3 2.3v.1c0 1.4 1 2.4 2.4 2.4v12.8c-1.7 0-3.1 1.4-3.1 3.2v14.4c0 2.6 2.1 4.8 4.7 4.8h1.6c2.6 0 4.7-2.2 4.7-4.8V30.8c0-1.8-1.4-3.2-3.1-3.2V14.8c1.3 0 2.4-1.8 2.4-3.1v-.1c0-1.2.9-2.2 2.1-2.2 3.1-.2 4.9 1.1 5.7 1.8.5.4 1.3.5 1.7.1.7-.5.9-1.5.3-2.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom43_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom43_tmpl.stylesheets.push.apply(
                        new_custom43_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom43_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom43-host',
                    shadowAttribute: 'buildTemplates-action_new_custom43'
                });
            var new_custom44 = Object(engine_dom_cjs.registerTemplate)(
                new_custom44_tmpl
            );
            function new_custom45_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M13.2 20.8h25.5v10.5H13.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 19.5v-4c0-2.5-2-4.5-4.5-4.5h-39C4 11 2 13 2 15.5v4c0 .5.3 1.1.8 1.3 1.8 1.1 3 3 3 5.2s-1.2 4.1-3 5.2c-.5.2-.8.7-.8 1.2v4.1C2 39 4 41 6.5 41h39c2.5 0 4.5-2 4.5-4.5v-4c0-.5-.3-1.1-.8-1.3-1.8-1.1-3-3-3-5.2s1.2-4.1 3-5.2c.5-.3.8-.7.8-1.3zm-8.2 16.3H10.2c-.8 0-1.5-.7-1.5-1.5V17.8c0-.8.7-1.5 1.5-1.5h31.5c.8 0 1.5.7 1.5 1.5v16.5c0 .8-.6 1.5-1.4 1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom44_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom44_tmpl.stylesheets.push.apply(
                        new_custom44_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom44_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom44-host',
                    shadowAttribute: 'buildTemplates-action_new_custom44'
                });
            var new_custom45 = Object(engine_dom_cjs.registerTemplate)(
                new_custom45_tmpl
            );
            function new_custom46_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M34.8 15.6H17.2c-.9 0-1.6.7-1.6 1.6v17.6c0 .9.7 1.6 1.6 1.6h17.6c.9 0 1.6-.7 1.6-1.6V17.2c0-.9-.7-1.6-1.6-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.8 7.8c.7-.3 1.2-.8 1.2-1.6V3.6c0-.9-.7-1.6-1.6-1.6h-2.6c-.7 0-1.3.5-1.5 1.2-.5 1.6-2 2.8-3.8 2.8s-3.3-1.2-3.8-2.8C36.3 2.5 35.8 2 35 2h-3.7c-.7 0-1.3.5-1.5 1.2-.4 1.6-2 2.8-3.8 2.8-1.8 0-3.3-1.2-3.8-2.8-.3-.7-.8-1.2-1.6-1.2H17c-.7 0-1.3.5-1.5 1.2C15 4.8 13.4 6 11.6 6 9.8 6 8.3 4.8 7.8 3.2 7.5 2.5 7 2 6.2 2H3.6C2.7 2 2 2.7 2 3.6v2.6c0 .8.5 1.3 1.2 1.6 1.6.4 2.8 2 2.8 3.8s-1.2 3.3-2.8 3.8c-.7.3-1.2.8-1.2 1.6v3.7c0 .7.5 1.3 1.2 1.5 1.6.4 2.8 2 2.8 3.8s-1.2 3.3-2.8 3.8c-.7.3-1.2.8-1.2 1.6V35c0 .7.5 1.3 1.2 1.5C4.8 37 6 38.6 6 40.4c0 1.8-1.2 3.3-2.8 3.8-.7.3-1.2.8-1.2 1.6v2.6c0 .9.7 1.6 1.6 1.6h2.6c.7 0 1.3-.5 1.5-1.2.5-1.6 2-2.8 3.8-2.8 1.8 0 3.3 1.2 3.8 2.8.2.7.8 1.2 1.5 1.2h3.7c.7 0 1.3-.5 1.5-1.2.5-1.6 2-2.8 3.8-2.8s3.3 1.2 3.8 2.8c.2.7.8 1.2 1.5 1.2H35c.7 0 1.3-.5 1.5-1.2.5-1.6 2-2.8 3.8-2.8 1.8 0 3.3 1.2 3.8 2.8.2.7.8 1.2 1.5 1.2h2.6c.9 0 1.6-.7 1.6-1.6v-2.6c0-.7-.5-1.3-1.2-1.5-1.6-.5-2.8-2-2.8-3.8s1.2-3.3 2.8-3.8c.7-.2 1.2-.8 1.2-1.5v-3.7c0-.7-.5-1.3-1.2-1.5-1.6-.5-2.8-2-2.8-3.8 0-1.8 1.2-3.3 2.8-3.8.7-.2 1.2-.8 1.2-1.5V17c0-.7-.5-1.3-1.2-1.5-1.6-.5-2.8-2-2.8-3.8s1.4-3.4 3-3.9zm-7.6 28.6c0 2.6-2.2 4.8-4.8 4.8H15.6c-2.6 0-4.8-2.2-4.8-4.8V15.6c0-2.6 2.2-4.8 4.8-4.8h20.8c2.6 0 4.8 2.2 4.8 4.8v20.8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom45_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom45_tmpl.stylesheets.push.apply(
                        new_custom45_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom45_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom45-host',
                    shadowAttribute: 'buildTemplates-action_new_custom45'
                });
            var new_custom46 = Object(engine_dom_cjs.registerTemplate)(
                new_custom46_tmpl
            );
            function new_custom47_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M36.6 43.6H8.9c-2.7 0-4.9 2.2-4.9 4.8v.1c0 .8.7 1.5 1.5 1.5h34.4c.8 0 1.5-.7 1.5-1.5v-.1c.1-2.6-2.1-4.8-4.8-4.8zM47.5 18.3l-13-11.8 2.1-3.1c.3-.5.1-1.1-.5-1.2-4-.8-6.4 1.9-6.4 1.9-25.1 0-21 27.1-19.8 33.4.2.7.8 1.3 1.6 1.3h22.1c.7 0 1.1-.8.7-1.3-4.5-5.4-6.8-11.4-8.3-15.2-.2-.6.4-1.4 1.1-1 5.9 3 8.4-.2 12.4 2.2 2 1.2 4.4.9 6-.7l2.2-2.2c.4-.6.4-1.6-.2-2.3zm-16.6-2.7c-1.4 0-2.4-1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom46_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom46_tmpl.stylesheets.push.apply(
                        new_custom46_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom46_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom46-host',
                    shadowAttribute: 'buildTemplates-action_new_custom46'
                });
            var new_custom47 = Object(engine_dom_cjs.registerTemplate)(
                new_custom47_tmpl
            );
            function new_custom48_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.4 5.2h-8V3.6c0-.9-.7-1.6-1.6-1.6H13.2c-.9 0-1.6.7-1.6 1.6v1.6h-8c-.9 0-1.6.7-1.6 1.6v10.4c0 4 3.2 7.2 7.2 7.2h3.7c2.2 5.1 7.1 8.7 13 8.8 6.1.1 11.2-3.6 13.4-8.8h3.5c4 0 7.2-3.2 7.2-7.2V6.8c0-.9-.7-1.6-1.6-1.6zM9.2 19.6c-1.4 0-2.4-1-2.4-2.4V10h4.8v8.5c0 .4 0 .7.1 1.1H9.2zm36-2.4c0 1.4-1 2.4-2.4 2.4h-2.5c0-.3.1-.7.1-1V10h4.8v7.2zM34 45.2h-.8c-2.6 0-4.8-2.2-4.8-4.8v-1.6c0-.5-.3-.8-.8-.8h-3.2c-.5 0-.8.3-.8.8v1.6c0 2.6-2.2 4.8-4.8 4.8H18c-.9 0-1.6.7-1.6 1.6v1.6c0 .9.7 1.6 1.6 1.6h16c.9 0 1.6-.7 1.6-1.6v-1.6c0-.9-.7-1.6-1.6-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom47_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom47_tmpl.stylesheets.push.apply(
                        new_custom47_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom47_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom47-host',
                    shadowAttribute: 'buildTemplates-action_new_custom47'
                });
            var new_custom48 = Object(engine_dom_cjs.registerTemplate)(
                new_custom48_tmpl
            );
            function new_custom49_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 18.8c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2 7.2-3.2 7.2-7.2-3.2-7.2-7.2-7.2zM26 30c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 42.3c0 1-.8 1.7-1.8 1.6-9.6-.8-17.3-8.5-18.2-18.2 0-.9.7-1.7 1.7-1.7h1.6c.8 0 1.5.6 1.6 1.4.7 7.2 6.5 13 13.7 13.7.8.1 1.4.8 1.4 1.6v1.6zm0-6.3c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm18.3-12h-1.6c-.8 0-1.5-.6-1.6-1.4-.7-7.2-6.5-13-13.7-13.7-.8-.1-1.4-.8-1.4-1.6V7.7c0-1 .8-1.7 1.8-1.6 9.7.8 17.4 8.6 18.2 18.2 0 .9-.7 1.7-1.7 1.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom48_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom48_tmpl.stylesheets.push.apply(
                        new_custom48_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom48_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom48-host',
                    shadowAttribute: 'buildTemplates-action_new_custom48'
                });
            var new_custom49 = Object(engine_dom_cjs.registerTemplate)(
                new_custom49_tmpl
            );
            function new_custom5_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M49.1 5.8C40.9 2.7 31.4 2 23 4.7 15.6 7.1 8 12.6 6.9 20.8c-.2 1.7-.2 3.6.2 5.2.2.9.5 1.7.8 2.6.2.5.3.9.6 1.3-.3.5-.6 1-1 1.4-2.3 3.6-3.9 7.7-4.9 11.8-.4 1.7-1.4 4.3.5 5.5.7.5 1.8.5 2.5.1 1-.6 1.1-1.5 1.3-2.5.7-4.2 2.2-8.4 4.5-12 1.1-1.7 2.3-3.5 3.7-5.1 1.2-1.3 3-3.7 5-3 2 .7 1.9 3 .6 4.2s-2.5 2.5-2.5 4.4c0 1.4.6 2.9 1.8 3.8 1.6 1.3 4.8 1.6 6.7 1.4 4.2-.2 7.7-1.5 11.1-4 4.5-3.1 6.2-8.5 7.1-13.6.6-3.2 1-6.3 2.1-9.3.5-1.3 1.1-2.5 1.8-3.6.3-.6 1-1.2 1.1-1.8.3-.9-.2-1.6-.8-1.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom49_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom49_tmpl.stylesheets.push.apply(
                        new_custom49_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom49_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom49-host',
                    shadowAttribute: 'buildTemplates-action_new_custom49'
                });
            var new_custom5 = Object(engine_dom_cjs.registerTemplate)(
                new_custom5_tmpl
            );
            function new_custom50_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.5 31.3c-1.8.9-3.9 1.4-6.1 1.4-2.6 0-5.1-.7-7.2-1.9-.2-.2-.6-.2-.8 0-2.1 1.3-4.6 1.9-7.2 1.9s-5.1-.7-7.2-1.9c-.2-.2-.6-.2-.8 0-2.1 1.3-4.6 1.9-7.2 1.9-2.2 0-4.3-.5-6.1-1.4-.6-.3-1.2.1-1.2.7v9.8c0 1.9 1.1 3.6 2.9 4.5 4 1.8 8.3 3.1 12.9 3.7 1 .2 1.8-.6 1.8-1.6v-6.1c0-2.7 2.2-4.8 4.7-4.8h.1c2.6 0 4.7 2.2 4.7 4.8v6.1c0 1 .9 1.7 1.8 1.6 4.5-.6 8.8-1.9 12.9-3.7 1.8-.8 2.9-2.5 2.9-4.5V32c.2-.6-.4-1-.9-.7zM10.9 27.8c2.9 0 5.4-1.2 7-3.2.3-.4.9-.4 1.2 0 1.6 1.9 4.2 3.2 7 3.2 2.9 0 5.4-1.2 7-3.2.3-.4.9-.4 1.2 0 1.6 1.9 4.2 3.2 7 3.2 4.5 0 8.3-3.2 8.7-7.1.1-.6-.2-1.1-.6-1.5L29 3c-1.8-1.4-4.3-1.4-5.9 0L2.6 19.2c-.4.3-.6.9-.6 1.5.6 4 4.4 7.1 8.9 7.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom5_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom5_tmpl.stylesheets.push.apply(
                        new_custom5_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom5_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom5-host',
                    shadowAttribute: 'buildTemplates-action_new_custom5'
                });
            var new_custom50 = Object(engine_dom_cjs.registerTemplate)(
                new_custom50_tmpl
            );
            function new_custom51_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M18.5 6.5c2 1.4 3.9 4.6 4.7 7.1.2.6.6 1 1.2 1 .6.2 1 .2 1.6.2.9 0 1.6 0 2.3-.3 2-.7 3.8-1.6 5.3-3.1 2.4-2.5 3.3-6 2.4-8.9-2.9-.9-6.4-.1-8.8 2.4-.7.7-1.3 1.5-1.7 2.4-1.3-2-2.8-3.8-4.5-4.9-1.2-.7-2.7-.3-3.4.9-.6 1.1-.1 2.5.9 3.2zM42.7 18.2c-8.1-4.6-9.8 1.6-16.7 1.6s-8.6-6.2-16.7-1.6C1.5 22.7 3.8 37.4 6.9 43c2.8 4.9 7.9 9.9 18.4 5.1.4-.2.9-.2 1.3 0 10.5 4.8 15.7-.3 18.4-5.1 3.2-5.6 5.5-20.3-2.3-24.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom50_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom50_tmpl.stylesheets.push.apply(
                        new_custom50_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom50_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom50-host',
                    shadowAttribute: 'buildTemplates-action_new_custom50'
                });
            var new_custom51 = Object(engine_dom_cjs.registerTemplate)(
                new_custom51_tmpl
            );
            function new_custom52_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49.9 14.1c.2-2.6 0-5.1-.4-7.6-.3-2.1-1.9-3.7-4-4-2.6-.4-5-.6-7.6-.4-.7 0-1 .9-.6 1.4l11.2 11.2c.6.4 1.4 0 1.4-.6zM31 3.8c-.4-.4-1-.6-1.5-.4-6 1.7-11.8 4.9-16.5 9.7-4.6 4.6-7.8 10.2-9.5 16-.2.6 0 1.2.4 1.6l17.4 17.4c.4.4 1 .6 1.6.4 5.8-1.8 11.4-4.9 16-9.5 4.7-4.7 8-10.4 9.7-16.5.2-.6 0-1.1-.4-1.5L31 3.8zm-6.7 31.4c-1 1-2.5 1-3.4 0l-4.5-4.5c-1-1-1-2.5 0-3.4 1-1 2.5-1 3.4 0l4.5 4.5c1 1 1 2.5 0 3.4zm5.6-5.6c-1 1-2.5 1-3.4 0L22 25.1c-1-1-1-2.5 0-3.4 1-1 2.5-1 3.4 0l4.5 4.5c1 1 1 2.5 0 3.4zm5.6-5.6c-1 1-2.5 1-3.4 0l-4.5-4.5c-1-1-1-2.5 0-3.4 1-1 2.5-1 3.4 0l4.5 4.5c1 1 1 2.5 0 3.4zM2.1 37.4c-.2 2.7-.1 5.4.4 8.2.3 2.1 1.9 3.7 4 4 2.7.4 5.4.6 8.2.4.7-.1 1-.9.6-1.4L3.4 36.8c-.4-.4-1.3-.1-1.3.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom51_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom51_tmpl.stylesheets.push.apply(
                        new_custom51_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom51_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom51-host',
                    shadowAttribute: 'buildTemplates-action_new_custom51'
                });
            var new_custom52 = Object(engine_dom_cjs.registerTemplate)(
                new_custom52_tmpl
            );
            function new_custom53_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.4 31.6h-.5c-1.8 0-3.2-1.4-3.2-3.3V17.7c0-9.3-8.2-16.7-17.5-15.6-8 .9-13.9 8-13.9 16.3v9.5c0 2-1.7 3.7-3.6 3.7h-.1c-1.4 0-2.6 1.2-2.6 2.6v1.9c0 1.4 1.2 2.6 2.6 2.6h38.8c1.4 0 2.6-1.2 2.6-2.6v-1.9c0-1.4-1.2-2.6-2.6-2.6zM31.2 43.6H20.8c-.6 0-1.2.5-1 1.1.6 3 3.1 5.3 6.3 5.3s5.7-2.2 6.3-5.3c0-.6-.5-1.1-1.2-1.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom52_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom52_tmpl.stylesheets.push.apply(
                        new_custom52_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom52_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom52-host',
                    shadowAttribute: 'buildTemplates-action_new_custom52'
                });
            var new_custom53 = Object(engine_dom_cjs.registerTemplate)(
                new_custom53_tmpl
            );
            function new_custom54_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M7.8 26.9c5.2-.9 9.8-3 14.7-5.3 1.6-.7 4.6-2.1 6-2.7.5-.2.8-.7.6-1.3-.4-2.3-2.3-4.2-4.7-4.2h-1.6v-3c0-.9-.8-1.6-1.6-1.6V5.6c0-.9-.7-1.6-1.6-1.6h-3.2c-.9 0-1.6.7-1.6 1.6v3.2c-.8 0-1.6.7-1.6 1.6v3h-1.6c-2.6 0-4.8 2.4-4.8 5.1V26c0 .6.5 1 1 .9zM43.6 42.7s5.8-9 6.4-21.6c0-.9-.7-1.7-1.7-1.7-19 .7-27.9 12.2-44.8 12.9-.9 0-1.5.8-1.5 1.6v6c0 2.6 2 4.6 4.5 4.8 8.4.5 26.4 1.7 36.7 3.4 1 .2 2-.8 1.8-1.8-.2-1.3-.6-2.7-1.4-3.6zm-.8-14.3c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom53_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom53_tmpl.stylesheets.push.apply(
                        new_custom53_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom53_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom53-host',
                    shadowAttribute: 'buildTemplates-action_new_custom53'
                });
            var new_custom54 = Object(engine_dom_cjs.registerTemplate)(
                new_custom54_tmpl
            );
            function new_custom55_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M12.5 33.3h9.8c.8 0 1.5-.7 1.5-1.5V9.9c0-1.6-1.5-2.9-3-2.9h-8c-1 0-1.7.7-1.7 1.7v23.2c-.1.7.6 1.4 1.4 1.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.5 11.4v23.4c0 1.6-1.4 2.9-3 2.9h-33c-1.7 0-3-1.3-3-2.9V11.4c-2.5 0-4.5 2-4.5 4.4v21.9c0 2.4 2 4.4 4.5 4.4h14.2c.8 0 1.5.7 1.5 1.5s.7 1.5 1.5 1.5h4.5c.8 0 1.5-.7 1.5-1.5s.7-1.5 1.5-1.5h14.2c2.5 0 4.5-2 4.5-4.4V15.8c.1-2.4-1.9-4.4-4.4-4.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M29.8 33.3h9.5c1 0 1.7-.7 1.7-1.7V8.5c0-.8-.7-1.5-1.5-1.5h-8.2c-1.5 0-3 1.3-3 2.9v21.9c-.1.8.6 1.5 1.5 1.5z'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom54_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom54_tmpl.stylesheets.push.apply(
                        new_custom54_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom54_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom54-host',
                    shadowAttribute: 'buildTemplates-action_new_custom54'
                });
            var new_custom55 = Object(engine_dom_cjs.registerTemplate)(
                new_custom55_tmpl
            );
            function new_custom56_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M36.2 10.3c-5 5-11.1-1.1-16.7 4.5l-16.1 16c-1.8 1.8-1.8 4.8 0 6.6L9 43l5.6 5.6c1.8 1.8 4.8 1.8 6.6 0l16.2-16.1c5.6-5.6-.6-11.7 4.5-16.7l1.3-1.3c.3-.3.3-.8 0-1.1L38.7 9c-.3-.3-.8-.3-1.1 0l-1.4 1.3zm-3.9 20.5l-5.6 5.6c-.6.6-1.6.6-2.2 0L20 31.9l-4.5-4.5c-.6-.6-.6-1.6 0-2.2l5.6-5.6c.6-.6 1.6-.6 2.2 0l4.5 4.5 4.5 4.5c.7.6.7 1.6 0 2.2zM49.5 5.8l-1.7-1.7-1.7-1.7c-.6-.6-1.6-.6-2.2 0l-2.1 2.1c-.3.3-.3.8 0 1.1l4.4 4.4c.3.3.8.3 1.1 0l2.1-2c.8-.5.8-1.5.1-2.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom55_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom55_tmpl.stylesheets.push.apply(
                        new_custom55_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom55_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom55-host',
                    shadowAttribute: 'buildTemplates-action_new_custom55'
                });
            var new_custom56 = Object(engine_dom_cjs.registerTemplate)(
                new_custom56_tmpl
            );
            function new_custom57_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M28.4 29v20.2c0 .7.7 1 1.2.7 3.9-2.2 15.8-9.1 15.8-9.1 1.5-.9 2.5-2.6 2.5-4.4V18.3c0-.7-.7-1-1.2-.7l-17.5 10c-.4.3-.8.8-.8 1.4zM26.8 23.3l17.6-10c.6-.3.6-1.1 0-1.4-3.9-2.2-15.9-9.2-15.9-9.2-1.5-.9-3.5-.9-5.1 0 0 0-12 6.9-15.9 9.2-.5.3-.5 1.1.1 1.4l17.6 10c.5.3 1.1.3 1.6 0zM22.7 27.5l-17.5-10c-.5-.3-1.2.1-1.2.8v18.1c0 1.8 1 3.5 2.5 4.4 0 0 11.9 6.9 15.8 9.1.6.3 1.2-.1 1.2-.7V29c.1-.6-.3-1.1-.8-1.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom56_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom56_tmpl.stylesheets.push.apply(
                        new_custom56_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom56_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom56-host',
                    shadowAttribute: 'buildTemplates-action_new_custom56'
                });
            var new_custom57 = Object(engine_dom_cjs.registerTemplate)(
                new_custom57_tmpl
            );
            function new_custom58_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M39.5 22.8c-1.4 0-2.5-1.1-2.4-2.6.1-1.3 1.2-2.2 2.6-2.2h6.9c.3 0 .6-.2.7-.4.6-1.1 1.1-2.2 1.5-3.3.2-.6-.2-1.1-.7-1.1H43c-1.3 0-2.5-1-2.6-2.2-.1-1.4 1-2.6 2.4-2.6h6.4c.5 0 .8-.3.8-.8V5.2c0-.9-.7-1.6-1.6-1.6h-8.5c-2.4 0-4.3 1.9-4.3 4.3V8c0 4.5-3 8.5-7.2 9.6V11c1.7-1 2.7-2.8 2.4-4.9-.3-2.1-2.1-3.8-4.2-4-2.9-.3-5.4 1.9-5.4 4.8 0 1.8 1 3.3 2.4 4.2v6.7c-4.2-1.1-7.2-5.1-7.2-9.6V8c0-2.4-1.9-4.3-4.3-4.3H3.6c-.9 0-1.6.7-1.6 1.6v2.4c0 .5.3.8.8.8H9c1.3 0 2.5 1 2.6 2.2.1 1.4-1 2.6-2.4 2.6H4c-.6 0-1 .6-.7 1.1.4 1 .9 2.2 1.5 3.3.2.2.4.4.7.4h6.9c1.3 0 2.5 1 2.6 2.2.1 1.4-1 2.6-2.4 2.6h-1.9c-.7 0-1.1 1-.5 1.4 3.4 2.9 7.8 4.9 13.6 4.9v18.2c0 1.3 1 2.5 2.2 2.6 1.4.1 2.6-1 2.6-2.4V29.2c5.8 0 10.2-2.1 13.6-4.9.6-.5.2-1.4-.5-1.4h-2.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom57_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom57_tmpl.stylesheets.push.apply(
                        new_custom57_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom57_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom57-host',
                    shadowAttribute: 'buildTemplates-action_new_custom57'
                });
            var new_custom58 = Object(engine_dom_cjs.registerTemplate)(
                new_custom58_tmpl
            );
            function new_custom59_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M39.7 10.8c.8 0 1.3-.6 1.3-1.4 0-.6-.3-1.1-.9-1.4-1-.6-2.6-3.3-3.2-5-.2-.6-.8-1-1.4-1H16.3c-.6 0-1.3.4-1.4 1-.5 1.6-2.1 4.4-3.1 5-.5.3-.8.8-.8 1.4 0 .8.6 1.4 1.3 1.4h27.4zM11 45.1c0 2.7 2.1 4.9 4.7 4.9h20.5c2.6 0 4.7-2.2 4.7-4.8v-.1c0-.9-.7-1.5-1.5-1.5h-27c-.7 0-1.4.7-1.4 1.5zM41 37.2v-20c0-.9-.7-1.6-1.6-1.6H12.6c-.9 0-1.6.7-1.6 1.6v20c0 .9.7 1.6 1.6 1.6h26.8c.9 0 1.6-.7 1.6-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom58_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom58_tmpl.stylesheets.push.apply(
                        new_custom58_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom58_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom58-host',
                    shadowAttribute: 'buildTemplates-action_new_custom58'
                });
            var new_custom59 = Object(engine_dom_cjs.registerTemplate)(
                new_custom59_tmpl
            );
            function new_custom6_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 47H5.2c-2.5 0-4-2.7-2.7-4.9L23.2 6.6c1.2-2.1 4.2-2.1 5.5 0l20.8 35.6c1.3 2.2-.3 4.9-2.7 4.9H26z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom59_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom59_tmpl.stylesheets.push.apply(
                        new_custom59_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom59_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom59-host',
                    shadowAttribute: 'buildTemplates-action_new_custom59'
                });
            var new_custom6 = Object(engine_dom_cjs.registerTemplate)(
                new_custom6_tmpl
            );
            function new_custom60_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 22.2C48.1 10.8 38.1 2 26 2S3.9 10.8 2 22.2c-.1.8.7 1.3 1.3.8 1.2-1 2.7-1.6 4.5-1.6 2.2 0 4.2 1 5.4 2.6.3.4 1 .4 1.3 0 1.3-1.6 3.2-2.6 5.4-2.6s4.2 1 5.4 2.6c.3.4 1 .4 1.3 0 1.3-1.6 3.2-2.6 5.4-2.6s4.2 1 5.4 2.6c.3.4 1 .4 1.3 0 1.3-1.6 3.2-2.6 5.4-2.6 1.7 0 3.3.6 4.5 1.6.7.5 1.5 0 1.4-.8zM35.6 40.4c-1.4 0-2.4 1-2.4 2.4s-1 2.4-2.4 2.4-2.4-1-2.4-2.4V31.6c0-1.4-1-2.4-2.4-2.4s-2.4 1-2.4 2.4v11.2c0 4 3.2 7.2 7.2 7.2s7.2-3.2 7.2-7.2c0-1.4-1-2.4-2.4-2.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom6_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom6_tmpl.stylesheets.push.apply(
                        new_custom6_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom6_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom6-host',
                    shadowAttribute: 'buildTemplates-action_new_custom6'
                });
            var new_custom60 = Object(engine_dom_cjs.registerTemplate)(
                new_custom60_tmpl
            );
            function new_custom61_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M44.4 2h-3.2c-.9 0-1.6.7-1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9-.6-1.6-1.6-1.6H30c-.9 0-1.6.7-1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6h-3.2c-.9 0-1.6.7-1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6H14c-.9 0-1.6-.7-1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6H7.6C6.7 2 6 2.7 6 3.6v8c0 2.6 2.2 4.8 4.8 4.8h30.4c2.6 0 4.8-2.2 4.8-4.8v-8c0-.9-.7-1.6-1.6-1.6zM40.8 22.5c-.1-.8-.8-1.4-1.6-1.4H12.8c-.8 0-1.5.6-1.6 1.4L7.6 48.1c-.2 1 .6 1.8 1.6 1.8h10.3c.9 0 1.7-.7 1.7-1.6v-7.7c0-2.6 2-5 4.6-5 2.7-.1 5 2.1 5 4.8v8c0 .9.8 1.6 1.7 1.6h10.3c1 0 1.8-.9 1.6-1.8l-3.6-25.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom60_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom60_tmpl.stylesheets.push.apply(
                        new_custom60_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom60_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom60-host',
                    shadowAttribute: 'buildTemplates-action_new_custom60'
                });
            var new_custom61 = Object(engine_dom_cjs.registerTemplate)(
                new_custom61_tmpl
            );
            function new_custom62_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.6 41.2H4.4c-1.3 0-2.4 1-2.4 2.4C2 44.9 3 46 4.4 46h43.2c1.3 0 2.4-1 2.4-2.4s-1-2.4-2.4-2.4zM5.2 36.4h27.2v-3.2c0-.9.7-1.6 1.6-1.6h8c.9 0 1.6.7 1.6 1.6v3.2h3.2c.9 0 1.6-.7 1.6-1.6V7.6c0-.9-.7-1.6-1.6-1.6H5.2c-.9 0-1.6.7-1.6 1.6v27.2c0 .9.7 1.6 1.6 1.6zm7.2-20.8c0-.9.7-1.6 1.6-1.6h23.2c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H14c-.9 0-1.6-.7-1.6-1.6v-1.6zm0 9.6c0-.9.7-1.6 1.6-1.6h15.2c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H14c-.9 0-1.6-.7-1.6-1.6v-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom61_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom61_tmpl.stylesheets.push.apply(
                        new_custom61_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom61_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom61-host',
                    shadowAttribute: 'buildTemplates-action_new_custom61'
                });
            var new_custom62 = Object(engine_dom_cjs.registerTemplate)(
                new_custom62_tmpl
            );
            function new_custom63_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M19.6 34h12.8c.9 0 1.6-.7 1.6-1.6V19.6c0-.9-.7-1.6-1.6-1.6H19.6c-.9 0-1.6.7-1.6 1.6v12.8c0 .9.7 1.6 1.6 1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.6 28.4c1.4 0 2.4-1 2.4-2.4s-1-2.4-2.4-2.4h-4v-4.8h4c1.4 0 2.4-1 2.4-2.4S49 14 47.6 14h-4v-.8c0-2.6-2.2-4.8-4.8-4.8H38v-4C38 3 37 2 35.6 2s-2.4 1-2.4 2.4v4h-4.8v-4C28.4 3 27.4 2 26 2s-2.4 1-2.4 2.4v4h-4.8v-4c0-1.4-1-2.4-2.4-2.4S14 3 14 4.4v4h-.8c-2.6 0-4.8 2.2-4.8 4.8v.8h-4C3 14 2 15 2 16.4s1 2.4 2.4 2.4h4v4.8h-4C3 23.6 2 24.6 2 26s1 2.4 2.4 2.4h4v4.8h-4c-1.4 0-2.4 1-2.4 2.4S3 38 4.4 38h4v.8c0 2.6 2.2 4.8 4.8 4.8h.8v4c0 1.4 1 2.4 2.4 2.4s2.4-1 2.4-2.4v-4h4.8v4c0 1.4 1 2.4 2.4 2.4s2.4-1 2.4-2.4v-4h4.8v4c0 1.4 1 2.4 2.4 2.4s2.4-1 2.4-2.4v-4h.8c2.6 0 4.8-2.2 4.8-4.8V38h4c1.4 0 2.4-1 2.4-2.4s-1-2.4-2.4-2.4h-4v-4.8h4zm-8.8 8c0 1.4-1 2.4-2.4 2.4H15.6c-1.4 0-2.4-1-2.4-2.4V15.6c0-1.4 1-2.4 2.4-2.4h20.8c1.4 0 2.4 1 2.4 2.4v20.8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom62_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom62_tmpl.stylesheets.push.apply(
                        new_custom62_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom62_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom62-host',
                    shadowAttribute: 'buildTemplates-action_new_custom62'
                });
            var new_custom63 = Object(engine_dom_cjs.registerTemplate)(
                new_custom63_tmpl
            );
            function new_custom64_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 2C12.8 2 2 12.8 2 26s10.8 24 24 24 24-10.8 24-24S39.2 2 26 2zm0 41.6c-9.7 0-17.6-7.9-17.6-17.6S16.3 8.4 26 8.4 43.6 16.3 43.6 26 35.7 43.6 26 43.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M35.3 15.7L22 20.5c-.7.2-1.3.8-1.5 1.5l-4.8 13.3c-.2.6.4 1.3 1 1L30 31.5c.7-.2 1.3-.8 1.5-1.5l4.8-13.3c.3-.6-.4-1.3-1-1zM26 29.2c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom63_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom63_tmpl.stylesheets.push.apply(
                        new_custom63_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom63_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom63-host',
                    shadowAttribute: 'buildTemplates-action_new_custom63'
                });
            var new_custom64 = Object(engine_dom_cjs.registerTemplate)(
                new_custom64_tmpl
            );
            function new_custom65_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M42.4 38.7H3.5c-.8 0-1.5.7-1.5 1.5v.1C2 42.9 4.1 45 6.7 45h32.6c2.6 0 4.7-2.1 4.7-4.8v-.1c-.1-.7-.8-1.4-1.6-1.4zM40.8 7H3.6c-.7 0-1.4.7-1.4 1.6-.2 2.1-.2 5.9.1 8.2 1 7.4 4.9 13.6 10.2 16.9.2.2.5.2.8.2h16.2c.3 0 .5-.1.8-.2 3-1.9 5.7-4.8 7.4-8.2.9.3 1.9.5 3 .5 5.1 0 9.3-4.3 9.3-9.5S45.9 7 40.8 7zm0 14.2c-.4 0-.8-.1-1.2-.2.8-2.5 1.2-5.2 1.2-8.1v-1.3c2.6 0 4.7 2.1 4.7 4.8s-2.2 4.8-4.7 4.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom64_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom64_tmpl.stylesheets.push.apply(
                        new_custom64_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom64_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom64-host',
                    shadowAttribute: 'buildTemplates-action_new_custom64'
                });
            var new_custom65 = Object(engine_dom_cjs.registerTemplate)(
                new_custom65_tmpl
            );
            function new_custom66_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.6 30.3L37 18.6c-1.8-1.8-4.8-1.8-6.6 0L18.6 30.3c-1.8 1.8-1.8 4.8 0 6.6l11.7 11.7c1.8 1.8 4.8 1.8 6.6 0l11.7-11.7c1.9-1.7 1.9-4.8 0-6.6zm-22 5.3c-1.1 1.1-2.9 1.1-3.9 0-1.1-1.1-1.1-2.9 0-3.9 1.1-1.1 2.9-1.1 3.9 0s1 2.8 0 3.9zm9 9.1c-1.1 1.1-2.9 1.1-3.9 0-1.1-1.1-1.1-2.9 0-3.9 1.1-1.1 2.9-1.1 3.9 0 1 1 1 2.8 0 3.9zm0-18.1c-1.1 1.1-2.9 1.1-3.9 0-1.1-1.1-1.1-2.9 0-3.9 1.1-1.1 2.9-1.1 3.9 0 1 1 1 2.8 0 3.9zm9 9c-1.1 1.1-2.9 1.1-3.9 0-1.1-1.1-1.1-2.9 0-3.9 1.1-1.1 2.9-1.1 3.9 0 1.2 1.1 1.2 2.8 0 3.9zM28.4 12.8v-6c0-2.6-2.2-4.8-4.8-4.8H6.8C4.2 2 2 4.2 2 6.8v16.8c0 2.6 2.2 4.8 4.8 4.8h6c.5 0 1-.2 1.3-.6.2-.3.6-.6.9-1L26.8 15c.3-.3.6-.6 1-.9.4-.3.6-.8.6-1.3zM8.8 24.4c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8zm6.4-6.4c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8-1.3 2.8-2.8 2.8zm6.4-6.4c-1.5 0-2.8-1.3-2.8-2.8S20.1 6 21.6 6c1.5 0 2.8 1.3 2.8 2.8s-1.3 2.8-2.8 2.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom65_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom65_tmpl.stylesheets.push.apply(
                        new_custom65_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom65_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom65-host',
                    shadowAttribute: 'buildTemplates-action_new_custom65'
                });
            var new_custom66 = Object(engine_dom_cjs.registerTemplate)(
                new_custom66_tmpl
            );
            function new_custom67_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M29.2 28.4l-1-1.7c-.4-.6-1-1-1.8-1-.2 0-.5.1-.7.2l-2.8 1c-1.1-1-2.3-1.6-3.7-2.1l-.5-2.9c-.2-1-1-1.5-2-1.5h-2c-1 0-1.8.6-2 1.6l-.5 2.8c-1.3.5-2.5 1.2-3.7 2.2l-2.8-1c-.2-.1-.5-.2-.7-.2-.7 0-1.4.4-1.8 1l-1 1.7c-.5.9-.3 1.9.5 2.6L5.1 33c-.2.7-.2 1.4-.2 2.1 0 .6.1 1.4.2 2.2l-2.3 1.9c-.8.6-1 1.8-.5 2.6l1 1.7c.4.6 1 1 1.8 1 .2 0 .5-.1.7-.2l2.8-1c1.1 1 2.3 1.7 3.7 2.1l.5 3c.2 1 1 1.7 2 1.7h2c1 0 1.8-.7 2-1.7l.5-3c1.4-.5 2.7-1.3 3.9-2.2l2.6 1c.2.1.5.2.7.2.7 0 1.4-.4 1.8-1l1-1.6c.5-.9.3-2-.5-2.6l-2.3-1.9c.2-.7.2-1.4.2-2.1 0-.7-.1-1.4-.2-2.2l2.3-1.9c.6-.8.8-1.9.4-2.7zM15.7 40.6c-3 0-5.5-2.4-5.5-5.5s2.4-5.5 5.5-5.5c3 0 5.5 2.4 5.5 5.5s-2.6 5.5-5.5 5.5zM49.4 17.1l-1.8-1.5c.1-.6.2-1.1.2-1.7 0-.6-.1-1.2-.2-1.7l1.8-1.5c.6-.5.8-1.4.4-2.1L49 7.2c-.3-.5-.9-.8-1.4-.8-.2 0-.4.1-.6.1l-2.3.9c-.9-.8-1.9-1.4-3-1.7l-.4-2.4c-.2-.8-.8-1.3-1.6-1.3h-1.6c-.8 0-1.5.5-1.6 1.3l-.4 2.3c-1.1.4-2.1 1-3 1.8l-2.3-1c-.2-.1-.4-.1-.6-.1-.6 0-1.1.3-1.4.8L28 8.4c-.4.7-.2 1.6.4 2.1l1.8 1.5c-.1.6-.2 1.1-.2 1.7 0 .6.1 1.2.2 1.7l-1.8 1.5c-.6.5-.8 1.4-.4 2.1l.8 1.4c.3.5.9.8 1.4.8.2 0 .4 0 .6-.1l2.3-.9c.9.8 1.9 1.4 3 1.7l.4 2.3c.2.8.8 1.4 1.6 1.4h1.6c.8 0 1.5-.6 1.6-1.4l.4-2.4c1.1-.4 2.2-1 3.1-1.8l2.2.9c.2.1.4.1.6.1.6 0 1.1-.3 1.4-.8l.8-1.3c.4-.4.2-1.2-.4-1.8zm-10.5 1.3c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-1.9 4.4-4.4 4.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom66_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom66_tmpl.stylesheets.push.apply(
                        new_custom66_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom66_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom66-host',
                    shadowAttribute: 'buildTemplates-action_new_custom66'
                });
            var new_custom67 = Object(engine_dom_cjs.registerTemplate)(
                new_custom67_tmpl
            );
            function new_custom68_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 2C12.8 2 2 12.8 2 26s10.8 24 24 24 24-10.8 24-24S39.2 2 26 2zm19 21.6h-6.3c-.2-5.7-1.5-10.6-3.4-14.4 5.3 3 8.9 8.2 9.7 14.4zM23.6 7.8v15.8h-5.5c.4-7.5 2.8-13.4 5.5-15.8zm0 20.6v15.8c-2.7-2.3-5.1-8.2-5.5-15.8h5.5zm4.8 15.8V28.4h5.5c-.4 7.5-2.8 13.4-5.5 15.8zm0-20.6V7.8c2.7 2.3 5.1 8.2 5.5 15.8h-5.5zM16.7 9.2c-1.9 3.8-3.1 8.7-3.4 14.4H7c.8-6.2 4.4-11.4 9.7-14.4zM7 28.4h6.3c.2 5.7 1.5 10.6 3.4 14.4-5.3-3-8.9-8.2-9.7-14.4zm28.3 14.4c1.9-3.8 3.1-8.7 3.4-14.4H45c-.8 6.2-4.4 11.4-9.7 14.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom67_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom67_tmpl.stylesheets.push.apply(
                        new_custom67_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom67_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom67-host',
                    shadowAttribute: 'buildTemplates-action_new_custom67'
                });
            var new_custom68 = Object(engine_dom_cjs.registerTemplate)(
                new_custom68_tmpl
            );
            function new_custom69_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M28.1 22.1c-4.6-3.4-9.2-1.8-12.2 1.1-1.1 1-2.9 1.7-4.8 2.2-2.2.7-4.6 1.4-6.2 3.1-4.6 4.5-3.7 9.8 2.5 16l.1.1.1.1c3.7 3.6 7 5.4 10.1 5.4 2.2 0 4.2-.9 6.2-2.7 1.7-1.6 2.5-3.9 3.2-6.1.6-1.8 1.3-3.7 2.3-4.7 1.8-1.8 2.9-3.8 3.1-5.9.2-1.5-.2-3.7-1.9-5.9 0-.2-1-1.5-2.5-2.7zm-9.9 19.3c-.4.4-1 .6-1.6.6-.6 0-1.1-.2-1.5-.6L10.6 37c-.9-.9-.9-2.2 0-3.1.9-.9 2.2-.9 3.1 0l4.4 4.4c.9.9.9 2.2.1 3.1zm3.8-6.5c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zM49.5 6.2l-3.7-3.7c-.6-.6-1.8-.6-2.5 0l-4.1 4.1c-.6.6-.6 1.8 0 2.5l.2.2-8.2 8.3c-.3.3-.3.9 0 1.2.6.6 1.7 1.5 2.3 2.2.3.3.8.3 1.1 0l8.2-8.2.2.2c.6.6 1.8.6 2.5 0l4.1-4.1c.6-.9.6-2-.1-2.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom68_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom68_tmpl.stylesheets.push.apply(
                        new_custom68_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom68_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom68-host',
                    shadowAttribute: 'buildTemplates-action_new_custom68'
                });
            var new_custom69 = Object(engine_dom_cjs.registerTemplate)(
                new_custom69_tmpl
            );
            function new_custom7_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M7.1 50C4.3 50 2 47.7 2 44.9V7.1C2 4.3 4.3 2 7.1 2h37.7C47.7 2 50 4.3 50 7.1v37.7c0 2.8-2.3 5.1-5.1 5.1H7.1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom69_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom69_tmpl.stylesheets.push.apply(
                        new_custom69_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom69_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom69-host',
                    shadowAttribute: 'buildTemplates-action_new_custom69'
                });
            var new_custom7 = Object(engine_dom_cjs.registerTemplate)(
                new_custom7_tmpl
            );
            function new_custom70_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M24.4 37l-9.2-9.1c-1.9-1.8-5-1.8-6.9 0l-5.8 5.7c-.6.6-.6 1.7 0 2.2L3.6 37l1.1 1.1 9.3 9.1.6.6 1.8 1.7c.6.6 1.7.6 2.3 0l5.8-5.7c1.8-1.8 1.8-4.9-.1-6.8zm-15-3.4l1.2-1.1c.6-.6 1.6-.6 2.2 0l7 6.8c.6.6.6 1.7 0 2.2l-1.2 1.1c-.6.6-1.6.6-2.2 0l-7-6.8c-.7-.6-.7-1.6 0-2.2zM19.4 25.3l7.5 7.3c.2.2.3.2.6.2l3.4-.1c.4 0 .7-.3.7-.7l.1-3c0-.4.3-.7.7-.7l3-.1c.4 0 .7-.3.7-.7l.1-3c0-.4.3-.7.7-.7l3-.1c.4 0 .7-.3.7-.7l.1-3c0-.4.3-.7.7-.7l3-.1c.4 0 .7-.3.7-.7l.1-3c0-.4.3-.6.6-.7l3.3-.5c.6-.1.9-.7.6-1.2L42.8 2.7c-.6-.8-1.7-.9-2.4-.2L19.3 23.3c-.5.5-.5 1.4.1 2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom7_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom7_tmpl.stylesheets.push.apply(
                        new_custom7_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom7_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom7-host',
                    shadowAttribute: 'buildTemplates-action_new_custom7'
                });
            var new_custom70 = Object(engine_dom_cjs.registerTemplate)(
                new_custom70_tmpl
            );
            function new_custom71_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M43 10.9C38.3 6.3 32 3.8 25.3 4 12.5 4.4 2 15.2 2 28v7.4c0 2.6 2.2 4.7 4.8 4.7H10v3.8c0 2 1.5 3.8 3.6 4.1 2.4.2 4.4-1.6 4.4-3.9v-14c0-2-1.5-3.8-3.6-4.1-2.4-.2-4.4 1.6-4.4 3.9v5.5H8.4c-.9 0-1.6-.7-1.6-1.6V28c0-10.4 8.4-19 18.6-19.3 5.3-.2 10.2 1.7 13.9 5.3 3.8 3.6 5.8 8.4 5.8 13.5v6.3c0 .9-.7 1.6-1.6 1.6H42v-5.3c0-2-1.5-3.8-3.6-4.1-2.4-.2-4.4 1.6-4.4 3.9v14c0 2 1.5 3.8 3.6 4.1 2.4.2 4.4-1.6 4.4-3.9v-3.9h3.2c2.6 0 4.8-2.1 4.8-4.7V28c0-6.3-2.4-12.5-7-17.1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom70_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom70_tmpl.stylesheets.push.apply(
                        new_custom70_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom70_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom70-host',
                    shadowAttribute: 'buildTemplates-action_new_custom70'
                });
            var new_custom71 = Object(engine_dom_cjs.registerTemplate)(
                new_custom71_tmpl
            );
            function new_custom72_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.6 2H4.4C3 2 2 3 2 4.4s1 2.4 2.4 2.4h19.2v5C15 12.9 8.4 20.2 8.4 29.1v5.5c0 5.8 4.6 10.6 10.6 10.6h14.2c5.8 0 10.5-4.7 10.5-10.6V29c0-8.9-6.6-16.2-15.2-17.4V6.8h19.2c1.4 0 2.4-1 2.4-2.4S49 2 47.6 2zM37.2 29c0 .1 0 0 0 0 0 2.3-1.8 4.2-4.2 4.2H19c-2.3 0-4.1-1.8-4.2-4.2v.1-.1.1c.1-6.2 5-11.1 11-11.1h.3c6.1 0 11 5 11.1 11z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '6.8',
                                                cy: '46.8',
                                                r: '3.2'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '45.2',
                                                cy: '46.8',
                                                r: '3.2'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom71_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom71_tmpl.stylesheets.push.apply(
                        new_custom71_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom71_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom71-host',
                    shadowAttribute: 'buildTemplates-action_new_custom71'
                });
            var new_custom72 = Object(engine_dom_cjs.registerTemplate)(
                new_custom72_tmpl
            );
            function new_custom73_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M4.8 14h42.4c1 0 1.8-1 1.5-2-1-3.3-2.4-6.3-4.3-9-.6-.8-1.7-.9-2.3-.2-1.9 1.8-4.6 2.8-7.4 2.8-3 0-5.7-1.2-7.7-3.2-.6-.6-1.6-.6-2.2 0-2 2-4.7 3.2-7.7 3.2-2.8 0-5.4-1-7.4-2.8-.6-.6-1.6-.5-2.2.3-1.9 2.6-3.4 5.7-4.3 9-.2.9.6 1.9 1.6 1.9zM50 20.4c0-.9-.7-1.6-1.6-1.6H3.6c-.9 0-1.6.7-1.6 1.6v.3c0 15 10.4 27.4 24 29.3 13.6-1.9 24-14.3 24-29.2v-.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom72_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom72_tmpl.stylesheets.push.apply(
                        new_custom72_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom72_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom72-host',
                    shadowAttribute: 'buildTemplates-action_new_custom72'
                });
            var new_custom73 = Object(engine_dom_cjs.registerTemplate)(
                new_custom73_tmpl
            );
            function new_custom74_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M30.1 44.4h-8.2c-.9 0-1.6.7-1.6 1.6v2.4c0 .9.7 1.6 1.6 1.6h8.2c.9 0 1.6-.7 1.6-1.6V46c0-.9-.7-1.6-1.6-1.6zM26 2C16 2 8 9.5 8 18.8c0 6 3.4 11.3 8.5 14.2 2 1.1 3.3 3 3.7 5.2.2.7.8 1.3 1.6 1.3h8.5c.8 0 1.5-.6 1.6-1.3.4-2.2 1.7-4.1 3.7-5.2 5-3 8.3-8.2 8.3-14.2C44 9.5 36 2 26 2zm-5.6 7.5c-1.6 3-2.5 6.6-2.6 9.5 0 3 .6 5.8 1.6 8.6.3.7-.4 1.4-1.1 1-7.5-3.8-7-17.6 1.1-20.3.7-.1 1.4.6 1 1.2zm6.3 19.1c-.2.6-1.2.6-1.5 0-1.3-3.1-1.6-6.8-1.7-10.2.1-3.4.4-7 1.7-10.2.2-.6 1.2-.6 1.5 0 1.3 3.1 1.6 6.8 1.7 10.2 0 3.4-.4 7-1.7 10.2zm6.7.1c-.7.3-1.4-.3-1.1-1 1.1-2.9 1.6-6.1 1.7-9.1-.1-2.6-1-6.1-2.6-9-.3-.6.3-1.4 1-1.1 8.1 2.6 8.6 16.5 1 20.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom73_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom73_tmpl.stylesheets.push.apply(
                        new_custom73_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom73_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom73-host',
                    shadowAttribute: 'buildTemplates-action_new_custom73'
                });
            var new_custom74 = Object(engine_dom_cjs.registerTemplate)(
                new_custom74_tmpl
            );
            function new_custom75_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 2c-1.4 0-2.4 1-2.4 2.4v43.2c0 1.4 1 2.4 2.4 2.4 13.2 0 24-10.8 24-24S39.2 2 26 2zm19 21.6h-6.3c-.2-5.7-1.5-10.6-3.4-14.4 5.3 3 8.9 8.2 9.7 14.4zM28.4 44.2V28.4h5.5c-.4 7.5-2.8 13.4-5.5 15.8zm0-20.6V7.8c2.7 2.3 5.1 8.2 5.5 15.8h-5.5zm6.9 19.2c1.9-3.8 3.1-8.7 3.4-14.4H45c-.8 6.2-4.4 11.4-9.7 14.4zM12.8 17.9c.6.5 1.6.4 2.2-.2l4.4-5c.6-.6.6-1.6-.1-2.2l-4.4-4.4c-.6-.6-1.4-.6-2-.2l-.9.6C6 10.8 2 17.9 2 26s4 15.2 10 19.5l.9.6c.6.4 1.4.3 2-.2l4.4-4.4c.6-.6.6-1.6.1-2.2l-4.4-5c-.6-.6-1.5-.7-2.2-.2l-1.7 1.3c-1.8-2.7-2.7-5.9-2.7-9.4s1-6.6 2.7-9.4l1.7 1.3z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom74_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom74_tmpl.stylesheets.push.apply(
                        new_custom74_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom74_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom74-host',
                    shadowAttribute: 'buildTemplates-action_new_custom74'
                });
            var new_custom75 = Object(engine_dom_cjs.registerTemplate)(
                new_custom75_tmpl
            );
            function new_custom76_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M25.9 30.4c-.2-.6-.9-1.1-1.6-1h-.7c-9 0-16.3-7.2-16.3-16.1v-.4c0-.8-1.1-1.1-1.5-.5-.6.8-1 1.8-1.3 2.8-1.4 4.6.4 9.6 4.3 12.4 1.8 1.3 3.7 1.9 5.6 2.1l.6 1.5c.1.2.2.4.4.5l2.4 1c.4.2.6.6.4 1l-.8 2.3c-.2.4.1.8.4 1l1.3.6c.4.2.6.6.4 1l-.7 2.5c-.1.4.1.8.4 1l1.9.8c.4.2.6.6.4 1l-.7 2.5c-.1.4.1.8.5 1l5.5 2.5c.4.2.9 0 1.1-.4l2.4-5.4c.2-.4.2-.8.1-1.2l-4.5-12.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.5 29.6l-13-13.4c.6-2 .6-4.2-.2-6.5-1.5-4.3-5.5-7.4-10.2-7.7-7-.3-12.7 5.6-12 12.6.6 4.8 4.2 8.8 9 9.7 2.1.4 4.2.2 6-.4l1.1 1.2c.2.2.3.2.6.2h2.8c.5 0 .8.3.8.8l.2 2.5c0 .4.4.7.8.7H35c.5 0 .8.3.8.8l.4 2.6c.1.4.4.6.8.6h2c.5 0 .8.3.8.8l.4 2.6c.1.4.4.6.8.6h6.1c.5 0 .8-.3.8-.8v-5.9c.1-.4-.1-.8-.4-1zm-25.6-14c-2.3 0-4.1-1.8-4.1-4s1.8-4 4.1-4 4.1 1.8 4.1 4-1.8 4-4.1 4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom75_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom75_tmpl.stylesheets.push.apply(
                        new_custom75_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom75_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom75-host',
                    shadowAttribute: 'buildTemplates-action_new_custom75'
                });
            var new_custom76 = Object(engine_dom_cjs.registerTemplate)(
                new_custom76_tmpl
            );
            function new_custom77_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M11.5 19.6h3.1c.5 0 .8-.3.8-.8v-1.2c0-6.1 4.5-10.8 10.2-10.8s10.2 4.7 10.2 10.8v1.2c0 .5.3.8.8.8h3.1c.5 0 .8-.3.8-.8v-1.2C40.5 8.9 34 2 25.6 2S10.7 8.9 10.7 17.6v1.2c0 .5.3.8.8.8zM41.3 24.4H10.7c-2.6 0-4.7 2.2-4.7 4.8v16c0 2.6 2.1 4.8 4.7 4.8h30.6c2.6 0 4.7-2.2 4.7-4.8v-16c0-2.6-2.1-4.8-4.7-4.8zM29.8 37.3c-.7 1.1-1.1 2.4-.8 3.7l.5 2.4c.2.9-.5 1.8-1.4 1.8h-5c-.9 0-1.6-1-1.4-1.8l.5-2.5c.3-1.3-.1-2.6-.8-3.6-.7-1-1-2.3-.8-3.6.4-1.9 2-3.4 3.9-3.8 3.2-.6 6 1.8 6 4.7 0 1-.3 1.9-.7 2.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom76_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom76_tmpl.stylesheets.push.apply(
                        new_custom76_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom76_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom76-host',
                    shadowAttribute: 'buildTemplates-action_new_custom76'
                });
            var new_custom77 = Object(engine_dom_cjs.registerTemplate)(
                new_custom77_tmpl
            );
            function new_custom78_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.6 9.5L34.2 2.3c-.6-.3-1.4-.3-2.2 0L18.8 8.9 5.4 2.3c-.7-.4-1.6-.4-2.3 0C2.4 2.8 2 3.6 2 4.4v36c0 .9.5 1.8 1.4 2.2l14.4 7.2c.6.3 1.4.3 2.2 0l13.3-6.6 13.4 6.6c.3.2.7.2 1 .2.4 0 .9-.2 1.3-.3.7-.5 1.1-1.3 1.1-2.1v-36c-.1-.9-.6-1.7-1.5-2.1zm-3.4 4.6v19c0 1.1-1.1 1.9-2.2 1.5-3.7-1.4-.8-7.6-3.4-11-2.5-3.1-5.8.1-8.8-4.8-3-4.7 1-8.1 4.6-9.9.5-.2 1-.2 1.4 0l7.4 3.8c.7.2 1 .8 1 1.4zM24.8 41.9c-.6.3-1.3.2-1.8-.2-1-.9-1.8-2.3-1.8-3.7 0-2.4-4-1.6-4-6.4 0-3.8-4.7-5-8.6-4.6-1 .1-1.8-.6-1.8-1.6V10.9c0-1.2 1.3-2 2.3-1.4l8.6 4.3c.1 0 .2.1.2.1l.3.2c3.6 2.1 2.9 3.8 1.4 6.4-1.7 2.9-2.4 0-4.8-.8s-4.8.8-4 2.4 3.2 0 4.8 1.6c1.6 1.6 1.6 4 6.4 2.4 4.8-1.6 5.6-.8 7.2.8 1.6 1.6 2.4 4.8 0 7.2-1.4 1.4-2 4.3-2.6 6.4-.2.4-.4.8-.8 1l-1 .4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom77_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom77_tmpl.stylesheets.push.apply(
                        new_custom77_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom77_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom77-host',
                    shadowAttribute: 'buildTemplates-action_new_custom77'
                });
            var new_custom78 = Object(engine_dom_cjs.registerTemplate)(
                new_custom78_tmpl
            );
            function new_custom79_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M17.8 19.3c-2.9 0-5.2 2.3-5.2 5.2s2.3 5.2 5.2 5.2 5.2-2.3 5.2-5.2-2.3-5.2-5.2-5.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.8 35.6H33.5v-5.9H35c.8 0 1.5-.7 1.5-1.5v-4.4c0-.8-.7-1.5-1.5-1.5h-1.7C32.1 14.9 25.8 9.2 18 9 9.1 8.9 1.9 16 2 24.7 2.2 33.3 9.4 40 18.1 40h27.4v1.5c0 .8.7 1.5 1.5 1.5h1.5c.8 0 1.5-.7 1.5-1.5v-3.7c0-1.2-1-2.2-2.2-2.2zm-30-1.5c-5.4 0-9.7-4.3-9.7-9.6s4.3-9.6 9.7-9.6 9.7 4.3 9.7 9.6-4.3 9.6-9.7 9.6z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom78_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom78_tmpl.stylesheets.push.apply(
                        new_custom78_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom78_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom78-host',
                    shadowAttribute: 'buildTemplates-action_new_custom78'
                });
            var new_custom79 = Object(engine_dom_cjs.registerTemplate)(
                new_custom79_tmpl
            );
            function new_custom8_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M23.7 3L4.8 23.8c-1.1 1.2-1.1 3.1 0 4.3L23.7 49c1.3 1.4 3.4 1.4 4.6 0l18.9-20.8c1.1-1.2 1.1-3.1 0-4.3L28.3 3c-1.2-1.3-3.4-1.3-4.6 0z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom79_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom79_tmpl.stylesheets.push.apply(
                        new_custom79_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom79_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom79-host',
                    shadowAttribute: 'buildTemplates-action_new_custom79'
                });
            var new_custom8 = Object(engine_dom_cjs.registerTemplate)(
                new_custom8_tmpl
            );
            function new_custom80_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M9.7 33.7c-4.3 0-7.7 3.4-7.7 7.7S5.5 49 9.7 49s7.7-3.4 7.7-7.7-3.4-7.6-7.7-7.6zm0 10.7c-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1c0 1.7-1.4 3.1-3.1 3.1zM42.3 33.7c-4.3 0-7.7 3.4-7.7 7.7S38 49 42.3 49s7.7-3.4 7.7-7.7-3.5-7.6-7.7-7.6zm0 10.7c-1.7 0-3.1-1.4-3.1-3.1 0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1c0 1.7-1.4 3.1-3.1 3.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M41.8 29.1c1.7-.1 3.3.2 4.9.8.8.3 1.6-.1 2-.8 3.9-7.4-2.4-10.9-6.4-12.9-1.1-.5-2.3.2-2.3 1.4V22c0 .9-.6 1.8-1.5 1.7-5.7-.9-10.8-6.9-17-6.9s-7 6.1-7 6.1c-4.3 0-8.6-.3-10.5-.8-1.1-.1-2 .6-2 1.6 0 0 0 5.4 7.7 5.4C16 29.1 21.3 33.7 22 40c.2 1.7 0 3.4-.5 4.8-.2.5.2 1.1.9 1.1h7.1c.6 0 1-.5.9-1.1-.5-1.5-.6-3-.5-4.6.6-6 5.7-10.9 11.9-11.1zM2 23.7zM22.4 11.8c.1.6.5 1.1 1.1 1.3l8.2 2.8c.8.2 1.5-.1 1.9-.8l.7-1.3c.3-.5-.1-1.1-.6-1.2-2.4-.2-7.4-1.1-6-3.8 1.3-2.3 4-1.7 5.8-.9.7.3 1.4-.5 1.1-1.1-1.2-2.5-3.9-4-6.7-3.7-3.6.4-6.2 3.9-5.7 7.5l.2 1.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom8_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom8_tmpl.stylesheets.push.apply(
                        new_custom8_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom8_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom8-host',
                    shadowAttribute: 'buildTemplates-action_new_custom8'
                });
            var new_custom80 = Object(engine_dom_cjs.registerTemplate)(
                new_custom80_tmpl
            );
            function new_custom81_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M47.5 2c-.8 0-3.1.1-3.9.1-12.3.6-26.5 3.7-27.2 3.9-1 .3-1.6 1.3-1.6 2.2v26.2c-.8-.3-2.1-.5-3.2-.5-5.3 0-9.6 3.6-9.6 8s4.3 8 9.6 8 9.6-3.6 9.6-8V25.6c0-.7.5-1.4 1.2-1.5 3.9-1 9.4-2 19.5-2.6 1-.1 1.7.6 1.7 1.6v8.3c-.8-.3-2.1-.5-3.2-.5-5.3 0-9.6 3.6-9.6 8s4.3 8 9.6 8 9.6-3.6 9.6-8V4.4C50 3 48.9 1.9 47.5 2zm-5.4 12.7c-9.8.6-14.7 1.5-19 2.5-1 .2-1.9-.6-1.9-1.6v-2.5c0-.7.5-1.4 1.3-1.6 4.2-1 9.2-2 19.4-2.6 1-.1 1.7.6 1.7 1.6V13c0 1-.6 1.7-1.5 1.7z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom80_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom80_tmpl.stylesheets.push.apply(
                        new_custom80_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom80_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom80-host',
                    shadowAttribute: 'buildTemplates-action_new_custom80'
                });
            var new_custom81 = Object(engine_dom_cjs.registerTemplate)(
                new_custom81_tmpl
            );
            function new_custom82_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 21.5H32.7c-.8 0-1.5.7-1.5 1.5v.7c0 1.2-1 2.2-2.3 2.2-1.2 0-2.3-1-2.3-2.2V23c0-.8-.7-1.5-1.5-1.5h-3.8.1c-4.4.2-8.3 2.8-10.4 6.4-.8-.3-1.6-.4-2.4-.4-3.8 0-6.8 3-6.8 6.7S5 41 8.8 41c.8 0 1.7-.1 2.4-.4 2.1 3.7 6 6.2 10.4 6.4 7.3.4 13.4-5.5 13.4-12.8 0-.4 0-.9-.1-1.3-.1-.7.5-1.5 1.2-1.6l12.7-2.8c.7-.1 1.2-.7 1.2-1.5v-4c0-.8-.7-1.5-1.5-1.5zm-39.8 15c-1.3 0-2.3-1-2.3-2.2s1-2.2 2.3-2.2c.3 0 .7.1.9.2-.2.9-.2 1.9-.2 2.8 0 .5.1.8.2 1.2-.3.1-.6.2-.9.2zM29 16.2c1.3 0 2.3-1 2.3-2.2V7.2C31.2 6 30.2 5 29 5c-1.3 0-2.3 1-2.3 2.2V14c0 1.3 1 2.2 2.3 2.2zM18.2 17c.5.5 1.1.7 1.7.7.5 0 1.1-.1 1.5-.5 1-.8 1.1-2.2.2-3.1l-4.5-5.2c-.8-1-2.3-1-3.2-.2-1 .8-1.1 2.2-.2 3.1l4.5 5.2zM38 17.7c.6 0 1.3-.3 1.7-.7l4.5-5.2c.8-1 .7-2.4-.2-3.1-1-.8-2.4-.7-3.2.2l-4.5 5.2c-.8 1-.7 2.4.2 3.1.4.4 1 .5 1.5.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom81_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom81_tmpl.stylesheets.push.apply(
                        new_custom81_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom81_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom81-host',
                    shadowAttribute: 'buildTemplates-action_new_custom81'
                });
            var new_custom82 = Object(engine_dom_cjs.registerTemplate)(
                new_custom82_tmpl
            );
            function new_custom83_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.7 17.4c.3.3.8.3 1.1 0l1.1-1.1c2.7-2.7 2.8-6.9.2-9.5 0 0-3.4-3.5-3.5-3.5-2.7-2.2-6.5-1.2-8.6 1l-1.1 1.1c-.3.3-.3.8 0 1.1l10.8 10.9zM31.3 9.8c-.3-.3-.8-.3-1.1 0l-22 21.9C7 32.9 6.1 34.3 5.6 36L2.1 46.8c-.2.6-.2 1.4.2 2 .5.8 1.3 1.2 2.1 1.2.2 0 .5 0 .7-.1 0 0 7.4-2.3 11-3.4 1.6-.5 3-1.4 4.2-2.6L42.2 22c.3-.3.3-.8 0-1.1L31.3 9.8zM14.6 41.9c-1.7.6-4.3 1.4-6.6 2.1l2.1-6.6c.2-.9.7-1.6 1.4-2.2l5.4 5.4c-.7.6-1.5 1.1-2.3 1.3z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom82_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom82_tmpl.stylesheets.push.apply(
                        new_custom82_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom82_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom82-host',
                    shadowAttribute: 'buildTemplates-action_new_custom82'
                });
            var new_custom83 = Object(engine_dom_cjs.registerTemplate)(
                new_custom83_tmpl
            );
            function new_custom84_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.6 37.2H6.4c-1.3 0-2.4 1-2.4 2.4S5 42 6.4 42h3.1l1.3 6.8c.2.7.8 1.2 1.5 1.2h25.8c.7 0 1.3-.5 1.5-1.2l1.3-6.8h4.7c1.3 0 2.4-1 2.4-2.4s-1-2.4-2.4-2.4zM12.6 32.4h11v-4.5c-.9-.6-1.6-1.6-1.6-2.7 0-1.8 1.4-3.2 3.1-3.2 1.7 0 3.1 1.4 3.1 3.2 0 1.2-.6 2.2-1.6 2.7v4.5h11c.9 0 1.6-.7 1.6-1.6v-2.4c0-4.9-4.6-6.6-8.2-8.1-2.4-1-2.8-2-2.8-3s.7-2 1.5-2.7c1.4-1.3 2.3-3.1 2.3-5.3 0-3.9-2.5-7.4-6.9-7.4s-6.9 3.4-6.9 7.4c0 2.2.8 3.9 2.3 5.3.8.7 1.5 1.7 1.5 2.7 0 1-.4 1.9-2.8 3-3.6 1.5-8.2 3.4-8.2 8.1v2.4c.1.9.8 1.6 1.6 1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom83_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom83_tmpl.stylesheets.push.apply(
                        new_custom83_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom83_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom83-host',
                    shadowAttribute: 'buildTemplates-action_new_custom83'
                });
            var new_custom84 = Object(engine_dom_cjs.registerTemplate)(
                new_custom84_tmpl
            );
            function new_custom85_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.4 5.2h-40V3.6c0-.9-.7-1.6-1.6-1.6H3.6C2.7 2 2 2.7 2 3.6v44.8c0 .9.7 1.6 1.6 1.6h3.2c.9 0 1.6-.7 1.6-1.6V11.6h40c.9 0 1.6-.7 1.6-1.6V6.8c0-.9-.7-1.6-1.6-1.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.2 16.4H18c-2.6 0-4.8 2.2-4.8 4.8v17.6c0 2.6 2.2 4.8 4.8 4.8h27.2c2.6 0 4.8-2.2 4.8-4.8V21.2c0-2.6-2.2-4.8-4.8-4.8zM40.8 30h-2v8c0 .5-.3.8-.8.8h-3.2c-.5 0-.8-.3-.8-.8v-4.8c0-.5-.3-.8-.8-.8H30c-.5 0-.8.3-.8.8V38c0 .5-.3.8-.8.8h-3.2c-.5 0-.8-.3-.8-.8v-8h-2c-.4 0-.6-.5-.2-.7l9-8.7c.3-.2.7-.2 1 0l9 8.7c.2.2 0 .7-.4.7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom84_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom84_tmpl.stylesheets.push.apply(
                        new_custom84_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom84_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom84-host',
                    shadowAttribute: 'buildTemplates-action_new_custom84'
                });
            var new_custom85 = Object(engine_dom_cjs.registerTemplate)(
                new_custom85_tmpl
            );
            function new_custom86_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M16.4 10h3.2c.5 0 .8-.3.8-.8V6.8h11.2v2.4c0 .5.3.8.8.8h3.2c.5 0 .8-.3.8-.8V6.8c0-2.6-2.2-4.8-4.8-4.8H20.4c-2.6 0-4.8 2.2-4.8 4.8v2.4c0 .5.3.8.8.8zM45.2 14.8H6.8C4.2 14.8 2 17 2 19.6v25.6C2 47.8 4.2 50 6.8 50h38.4c2.6 0 4.8-2.2 4.8-4.8V19.6c0-2.6-2.2-4.8-4.8-4.8zM26 43.6c-6.2 0-11.2-5-11.2-11.2s5-11.2 11.2-11.2 11.2 5 11.2 11.2-5 11.2-11.2 11.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M30.8 30h-2.4v-2.4c0-.9-.7-1.6-1.6-1.6h-1.6c-.9 0-1.6.7-1.6 1.6V30h-2.4c-.9 0-1.6.7-1.6 1.6v1.6c0 .9.7 1.6 1.6 1.6h2.4v2.4c0 .9.7 1.6 1.6 1.6h1.6c.9 0 1.6-.7 1.6-1.6v-2.4h2.4c.9 0 1.6-.7 1.6-1.6v-1.6c0-.9-.7-1.6-1.6-1.6z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom85_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom85_tmpl.stylesheets.push.apply(
                        new_custom85_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom85_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom85-host',
                    shadowAttribute: 'buildTemplates-action_new_custom85'
                });
            var new_custom86 = Object(engine_dom_cjs.registerTemplate)(
                new_custom86_tmpl
            );
            function new_custom87_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.6 2H6.4C5 2 4 3 4 4.4v38.4c0 1.4 1 2.4 2.4 2.4h.8v2.4c0 1.4 1 2.4 2.4 2.4h1.6c1.3 0 2.4-1 2.4-2.4v-2.4h25.1v2.4c0 1.4 1 2.4 2.4 2.4h1.6c1.3 0 2.4-1 2.4-2.4v-2.4h.8c1.3 0 2.4-1 2.4-2.4V4.4C48 3 47 2 45.6 2zM11.1 40.4c-1.3 0-2.4-1-2.4-2.4V9.2c0-1.4 1-2.4 2.4-2.4H41c1.3 0 2.4 1 2.4 2.4V38c0 1.4-1 2.4-2.4 2.4H11.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M37 11.6H15c-.9 0-1.6.7-1.6 1.6V34c0 .9.7 1.6 1.6 1.6h22c.9 0 1.6-.7 1.6-1.6V13.2c0-.9-.7-1.6-1.6-1.6zM33.3 26h-6.5c-.9 1.6-2.7 3.2-4.9 3.2-3 0-5.3-2.6-5.3-5.6S19 18 21.9 18c2.2 0 4.1 1.6 4.9 3.2h6.4c1.2 0 2.1 1.2 2.1 2.4.1 1.2-.8 2.4-2 2.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom86_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom86_tmpl.stylesheets.push.apply(
                        new_custom86_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom86_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom86-host',
                    shadowAttribute: 'buildTemplates-action_new_custom86'
                });
            var new_custom87 = Object(engine_dom_cjs.registerTemplate)(
                new_custom87_tmpl
            );
            function new_custom88_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 42h-45c-.8 0-1.5.6-1.5 1.4v.1c0 3.6 4.5 6.5 8 6.5h32c3.5 0 8-2.9 8-6.5v-.1c0-.8-.7-1.4-1.5-1.4zM4.4 37.2h14.4c.9 0 1.6-.9 1.6-1.8V7.9c0-.4-.6-.6-.7-.2l-16 28.2c-.3.6.1 1.3.7 1.3zM26.8 37.2h20c1 0 1.7-.9 1.6-1.8-.7-5.8-1.7-23.7-22.1-33.3-.5-.2-1.1.1-1.1.7v32.6c0 .9.7 1.8 1.6 1.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom87_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom87_tmpl.stylesheets.push.apply(
                        new_custom87_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom87_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom87-host',
                    shadowAttribute: 'buildTemplates-action_new_custom87'
                });
            var new_custom88 = Object(engine_dom_cjs.registerTemplate)(
                new_custom88_tmpl
            );
            function new_custom89_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M32.3 20.7c-.3-.4-1-.3-1.2.2-1 1.4-1.9 3.4-1.9 5.9v8.8c0 1.3-1 2.4-2.4 2.4-1.3 0-2.4-1-2.4-2.4v-2.5V8.3c0-6.1-5.4-7.1-9.3-5.6-1 .3-2 1-2.7 1.8-.5.6-1 1-1.8 1.3-1.4.3-3.9-1-5.2-1.8-.7-.4-1.7-.2-2.1.4l-1 1.4c-.6.7-.3 1.8.4 2.3 1.5 1 3.9 2.5 5.8 2.8 2.8.5 5.4-.4 7.4-2.3l-.1.1c.6-.5 1.5-1.3 2.2-.4 1.6 2.4-4.8 12.9-4.8 28.1v1.3c0 6.5 6.6 12.1 13 12.4 6.9.3 12.6-5.2 12.6-12 0-3.4 1.3-5.7 2.6-7 .3-.3.3-.8 0-1.1l-9.1-9.3zM47.6 28.3c-.6 0-1.2-.2-1.7-.7L33.1 14.9c-1-1-1-2.5 0-3.4 1-1 2.5-1 3.4 0l12.8 12.8c1 1 1 2.5 0 3.4-.5.4-1.1.6-1.7.6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom88_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom88_tmpl.stylesheets.push.apply(
                        new_custom88_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom88_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom88-host',
                    shadowAttribute: 'buildTemplates-action_new_custom88'
                });
            var new_custom89 = Object(engine_dom_cjs.registerTemplate)(
                new_custom89_tmpl
            );
            function new_custom9_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M49.5 17.3C47.2 7.8 37.2 2 26.2 2 12.8 2 2 12.7 2 26s10.8 24 24.2 24c18.6 0 17.1-9.4 11.2-13.1-3.5-2.2-5.4-7.3-1.9-10.9 6.5-6.7 17 4 14-8.7zM13 34c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm1-19c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm11 29c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm9-26c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom89_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom89_tmpl.stylesheets.push.apply(
                        new_custom89_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom89_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom89-host',
                    shadowAttribute: 'buildTemplates-action_new_custom89'
                });
            var new_custom9 = Object(engine_dom_cjs.registerTemplate)(
                new_custom9_tmpl
            );
            function new_custom90_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47.9 6.9L28.4 9.7v27.5c0 .5-.3.8-.8.8h-3.2c-.5 0-.8-.3-.8-.8V10.5L4.8 13.3h-.3c-1.2 0-2.2-.9-2.4-2.1-.2-1.3.7-2.6 1.9-2.7l14.9-2.2c1.4-2.5 4-4.2 7-4.2 2.2 0 4.2.9 5.6 2.3l15.7-2.2c1.3-.2 2.6.7 2.7 2 .2 1.2-.6 2.4-2 2.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M19.1 36.3c.6-.7.7-1.6.3-2.5L13 18.7c-.3-.9-1.2-1.4-2.2-1.4s-1.8.5-2.2 1.4L2.2 33.9c-.3.7-.2 1.5.2 2.2.2.2 3.3 5 8.3 5 2.9 0 5.8-1.6 8.4-4.8zm-8.3-10.5l3.4 8.2H7.4l3.4-8.2zM43.4 13.9c-.4-.9-1.3-1.4-2.2-1.4-1 0-1.8.6-2.2 1.4l-6.4 15.2c-.3.7-.2 1.5.2 2.2.2.2 3.3 5 8.3 5 3 0 5.8-1.6 8.4-4.8.6-.7.7-1.6.3-2.5l-6.4-15.1zM41.2 21l3.4 8.2h-6.9l3.5-8.2zM26 42.8c-4.5 0-9 1.6-12.2 4.3-.3.3-.6.7-.6 1.2v.1c0 .9.7 1.6 1.6 1.6h22.4c.9 0 1.6-.7 1.6-1.6v-.1c0-.5-.2-.9-.6-1.2-3.2-2.7-7.7-4.3-12.2-4.3z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom9_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom9_tmpl.stylesheets.push.apply(
                        new_custom9_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom9_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom9-host',
                    shadowAttribute: 'buildTemplates-action_new_custom9'
                });
            var new_custom90 = Object(engine_dom_cjs.registerTemplate)(
                new_custom90_tmpl
            );
            function new_custom91_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.3 12.1c-2.4-.7-4.5-2.4-5.9-4.6-1-1.7-1.1-5.5-3.7-5.5H13.3c-2.6 0-2.6 3.8-3.7 5.5-1.7 2.6-3.8 3.3-6.4 4.8-2.6 1.5-.2 7.9.4 10.2 2.5 8.9 7.2 17.1 14.6 23 2.1 1.7 4.3 3.1 6.7 4.3 2.2 1.1 5.8-2 7.4-3.2 4.2-3 7.6-6.7 10.3-11 2.3-3.7 4.1-7.7 5.4-11.8.5-1.7 1-3.4 1.3-5.1.3-1.4 1-3.7.6-5.1-.2-.7-.9-1.3-1.6-1.5-3.7-1.1 1.1.3 0 0zm-3.5 5.6c-2.2 10.7-7.9 20.7-17.5 26.6L26 45l-1.3-.8c-11.5-7-15.9-18.3-17.5-26.6L7 16l1.4-.9c2.5-1.5 4.8-4.2 6.2-7l.6-1.4h21.6l.4 1c1.4 3 3.8 5.9 6.8 7.6l1 .6v.1l-.2 1.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M25.2 11.6c-1.8 0-6.3 0-7.2.8-1.5 1.4-2.4 3.4-4 4.7-1.7 1.4-.9 2.9-.3 4.8 1.1 3.4 2.6 6.6 4.7 9.6 1 1.5 2.2 3 3.6 4.2.4.4 4.1 4.1 4.1 1.8V13.2c-.1-.9-.1-1.6-.9-1.6z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom90_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom90_tmpl.stylesheets.push.apply(
                        new_custom90_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom90_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom90-host',
                    shadowAttribute: 'buildTemplates-action_new_custom90'
                });
            var new_custom91 = Object(engine_dom_cjs.registerTemplate)(
                new_custom91_tmpl
            );
            function new_custom92_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45 31.1l-18.2-8.3c-.5-.2-1-.2-1.4 0L7 31.1c-1 .5-1.4 1.7-.7 2.6 1.9 2.7 3.1 6.2 3.6 7.8.2.6.7 1 1.3 1.2 6.3 1.5 11.5 5.1 13.7 6.8.6.5 1.5.5 2.2 0 2.2-1.7 7.4-5.3 13.7-6.8.6-.2 1.1-.6 1.3-1.2.5-1.7 1.7-5.2 3.6-7.8.6-.8.3-2.1-.7-2.6zm-23.8 4.5c-1.4 0-2.4-1.4-2.4-3.2 0-1.8 1-3.2 2.4-3.2s2.4 1.4 2.4 3.2c0 1.8-1 3.2-2.4 3.2zm9.6 0c-1.4 0-2.4-1.4-2.4-3.2 0-1.8 1-3.2 2.4-3.2s2.4 1.4 2.4 3.2c0 1.8-1 3.2-2.4 3.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M13.5 22.9l9.8-4.5c1.2-.6 2.5-.7 3.8-.5.6.1 1.1.3 1.7.6l9.7 4.5c.6.2 1.1-.2 1.1-.7v-3.6c0-.4-.2-.8-.5-1.1-.6-.7-1.9-1.9-4.3-1.9V11c0-.6-.3-1.1-.8-1.4-.9-.5-2.4-1.2-4.8-1.6V3.6c0-.9-.7-1.6-1.6-1.6h-3.2c-.9 0-1.6.7-1.6 1.6v4.3c-2.4.4-3.9 1.1-4.8 1.6-.5.2-.8.8-.8 1.4v4.7c-2.4 0-3.7 1.2-4.3 1.8-.3.3-.5.7-.5 1.1v3.6c0 .6.6 1 1.1.8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom91_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom91_tmpl.stylesheets.push.apply(
                        new_custom91_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom91_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom91-host',
                    shadowAttribute: 'buildTemplates-action_new_custom91'
                });
            var new_custom92 = Object(engine_dom_cjs.registerTemplate)(
                new_custom92_tmpl
            );
            function new_custom93_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M20.1 26H44c.7 0 1.4-.5 1.5-1.2l4.4-14.9c.3-1-.5-2-1.5-2H11.5l-.6-2.2C10.5 4.7 9.5 4 8.5 4H4.6C3.3 4 2.1 4.9 2 6.2c-.1 1.3 1.1 2.5 2.4 2.5h2.3l7.6 25c.3 1 1.2 1.7 2.3 1.7h28.2c1.3 0 2.5-.9 2.6-2.2.1-1.3-1.1-2.5-2.4-2.5H20.2c-1.1 0-2-.7-2.3-1.6V29c-.5-1.5.7-3 2.2-3z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'ellipse',
                                        {
                                            attrs: {
                                                cx: '20.6',
                                                cy: '44.1',
                                                rx: '4',
                                                ry: '3.9'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'ellipse',
                                        {
                                            attrs: {
                                                cx: '40.1',
                                                cy: '44.1',
                                                rx: '4',
                                                ry: '3.9'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom92_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom92_tmpl.stylesheets.push.apply(
                        new_custom92_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom92_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom92-host',
                    shadowAttribute: 'buildTemplates-action_new_custom92'
                });
            var new_custom93 = Object(engine_dom_cjs.registerTemplate)(
                new_custom93_tmpl
            );
            function new_custom94_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M30.8 16.4v-12c0-1.4-1-2.4-2.4-2.4h-3.2c-1.4 0-2.4 1-2.4 2.4s1 2.4 2.4 2.4h.8v9.6c0 5.3-4.3 9.6-9.6 9.6s-9.6-4.3-9.6-9.6V6.8h.8c1.4 0 2.4-1 2.4-2.4S9 2 7.6 2H4.4C3 2 2 3 2 4.4v12c0 7.9 6.5 14.4 14.4 14.4s14.4-6.5 14.4-14.4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M50 26c0-4-3.2-7.2-7.2-7.2S35.6 22 35.6 26c0 3.1 2 5.8 4.8 6.8v1.8c0 5.8-4.8 10.6-10.6 10.6h-.2c-5 0-9.3-3.6-10.4-8.3-.2-.7-.8-1.3-1.6-1.3H16c-1 0-1.8 1-1.6 1.9C15.7 44.6 22 50 29.4 50h.2c8.6 0 15.5-7 15.5-15.4v-1.8c2.9-1 4.9-3.7 4.9-6.8zm-7.2 2.4c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom93_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom93_tmpl.stylesheets.push.apply(
                        new_custom93_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom93_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom93-host',
                    shadowAttribute: 'buildTemplates-action_new_custom93'
                });
            var new_custom94 = Object(engine_dom_cjs.registerTemplate)(
                new_custom94_tmpl
            );
            function new_custom95_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M28.4 10.2V6.8h.8c1.3 0 2.4-1 2.4-2.4 0-1.3-1-2.4-2.4-2.4h-6.4c-1.3 0-2.4 1-2.4 2.4 0 1.3 1 2.4 2.4 2.4h.8v3.4C13.7 11.4 6 19.8 6 30c0 11 9 20 20 20s20-9 20-20c0-10.2-7.7-18.6-17.6-19.8zm-2.4 35c-8.4 0-15.2-6.8-15.2-15.2S17.6 14.8 26 14.8 41.2 21.6 41.2 30 34.4 45.2 26 45.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M31.3 21.8l-3.7 3.7c-.5-.2-1-.3-1.6-.3-2.6 0-4.8 2.2-4.8 4.8s2.2 4.8 4.8 4.8 4.8-2.2 4.8-4.8c0-.6-.1-1.1-.3-1.6l3.7-3.7c.8-.8.8-2.1 0-2.9-.8-.8-2.1-.8-2.9 0z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom94_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom94_tmpl.stylesheets.push.apply(
                        new_custom94_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom94_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom94-host',
                    shadowAttribute: 'buildTemplates-action_new_custom94'
                });
            var new_custom95 = Object(engine_dom_cjs.registerTemplate)(
                new_custom95_tmpl
            );
            function new_custom96_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49.5 9l-4.2-3.1c-.6-.4-1.2-.6-1.9-.6H29.2V3.6c0-.9-.7-1.6-1.6-1.6h-3.2c-.9 0-1.6.7-1.6 1.6v1.6h-16c-.9 0-1.6.7-1.6 1.6v6.4c0 .9.7 1.6 1.6 1.6H43.4c.7 0 1.4-.2 1.9-.6l4.2-3.1c.7-.6.7-1.6 0-2.1zM45.2 22.8h-16v-2.4c0-.5-.3-.8-.8-.8h-4.8c-.5 0-.8.3-.8.8v2.4H8.6c-.7 0-1.4.2-1.9.6l-4.2 3.1c-.7.5-.7 1.5 0 2.1l4.2 3.1c.6.4 1.2.6 1.9.6h36.6c.9 0 1.6-.7 1.6-1.6v-6.4c0-.8-.7-1.5-1.6-1.5zM29.2 43.3V38c0-.5-.3-.8-.8-.8h-4.8c-.5 0-.8.3-.8.8v5.3c-3.2.9-5 2.8-5.5 5.2-.2.7.4 1.5 1.2 1.5h15.1c.8 0 1.4-.7 1.2-1.5-.6-2.4-2.4-4.3-5.6-5.2z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom95_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom95_tmpl.stylesheets.push.apply(
                        new_custom95_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom95_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom95-host',
                    shadowAttribute: 'buildTemplates-action_new_custom95'
                });
            var new_custom96 = Object(engine_dom_cjs.registerTemplate)(
                new_custom96_tmpl
            );
            function new_custom97_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M34.2 29.3v-19C34.2 5.6 30.6 2 26 2h-.1c-4.6 0-8.2 3.7-8.2 8.3v19C15.3 31.6 14 34.7 14 38c0 6.6 5.4 12 12 12s12-5.4 12-12c0-3.4-1.3-6.4-3.8-8.7zM32.3 38H19.7c-.7 0-1.2-.7-1.1-1.4.3-1.8 1.3-3.4 2.7-4.5.5-.5.9-1.1.9-1.8v-20c0-2.2 1.6-3.8 3.7-3.8h.1c2.1 0 3.7 1.7 3.7 3.8v.7h-2.2c-1.3 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h2.2v3h-2.2c-1.3 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h2.2v3h-2.2c-1.3 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h2.2c.1.7.4 1.2.9 1.7 1.4 1.1 2.4 2.8 2.7 4.5.2.9-.3 1.6-1 1.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom96_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom96_tmpl.stylesheets.push.apply(
                        new_custom96_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom96_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom96-host',
                    shadowAttribute: 'buildTemplates-action_new_custom96'
                });
            var new_custom97 = Object(engine_dom_cjs.registerTemplate)(
                new_custom97_tmpl
            );
            function new_custom98_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49.6 22.1l-5.9-5.9c-.3-.3-.7-.5-1-.5h-6.1c-.8 0-1.5.7-1.5 1.5v12.1c0 .5.5.9 1.1.7 1-.5 2.2-.7 3.4-.7 3.4 0 6.3 1.9 7.9 4.7.2.4.8.5 1.1.2.9-.8 1.5-2 1.5-3.4v-7.7c-.1-.3-.2-.7-.5-1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M29 9H3.5C2.7 9 2 9.7 2 10.5v20.4c0 1.4.6 2.6 1.5 3.4.4.3.9.2 1.1-.2 1.5-2.8 4.5-4.7 7.9-4.7 3.8 0 6.9 2.3 8.3 5.6.1.3.4.5.7.5H26c2.5 0 4.5-2 4.5-4.5V10.5c0-.8-.7-1.5-1.5-1.5z'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '39.5',
                                                cy: '38.5',
                                                r: '4.5'
                                            },
                                            key: 5
                                        },
                                        []
                                    ),
                                    api_element(
                                        'circle',
                                        {
                                            attrs: {
                                                cx: '12.5',
                                                cy: '38.5',
                                                r: '4.5'
                                            },
                                            key: 6
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom97_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom97_tmpl.stylesheets.push.apply(
                        new_custom97_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom97_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom97-host',
                    shadowAttribute: 'buildTemplates-action_new_custom97'
                });
            var new_custom98 = Object(engine_dom_cjs.registerTemplate)(
                new_custom98_tmpl
            );
            function new_custom99_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45.2 16.6H31.8c-.4-.9-1-1.7-1.7-2.4l5-6.4c.8-1 .6-2.5-.4-3.3-1-.8-2.6-.6-3.4.4L25.8 12c-.5 0-.9-.1-1.4-.1-.5 0-.9.1-1.3.1l-5.6-7.1c-.8-1-2.3-1.2-3.4-.4s-1.1 2.3-.3 3.3l5 6.4c-.7.7-1.3 1.5-1.7 2.4H6.8c-2.6 0-4.8 2.1-4.8 4.7v22C2 45.9 4.2 48 6.8 48h38.4c2.6 0 4.8-2.1 4.8-4.7v-22c0-2.6-2.2-4.7-4.8-4.7zm-6.4 25.1c0 .9-.7 1.6-1.6 1.6H8.4c-.9 0-1.6-.7-1.6-1.6V22.9c0-.9.7-1.6 1.6-1.6h28.8c.9 0 1.6.7 1.6 1.6v18.8zm5.6-7.8c-1.4 0-2.4-1-2.4-2.4s1-2.4 2.4-2.4 2.4 1 2.4 2.4-1 2.4-2.4 2.4zm0-7.9C43 26 42 25 42 23.7c0-1.3 1-2.4 2.4-2.4s2.4 1 2.4 2.4c0 1.3-1 2.3-2.4 2.3z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_custom98_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom98_tmpl.stylesheets.push.apply(
                        new_custom98_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom98_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom98-host',
                    shadowAttribute: 'buildTemplates-action_new_custom98'
                });
            var new_custom99 = Object(engine_dom_cjs.registerTemplate)(
                new_custom99_tmpl
            );
            function new_event_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M46.5 20h-41c-.8 0-1.5.7-1.5 1.5V46c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V21.5c0-.8-.7-1.5-1.5-1.5zM19 42c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm10 10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm10 10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zm0-10c0 .6-.4 1-1 1h-4c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v4zM44 7h-5V5c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v2H19V5c0-1.6-1.3-3-3-3-1.6 0-3 1.3-3 3v2H8c-2.2 0-4 1.8-4 4v2.5c0 .8.7 1.5 1.5 1.5h41c.8 0 1.5-.7 1.5-1.5V11c0-2.2-1.8-4-4-4z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_custom99_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_custom99_tmpl.stylesheets.push.apply(
                        new_custom99_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_custom99_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_custom99-host',
                    shadowAttribute: 'buildTemplates-action_new_custom99'
                });
            var new_event = Object(engine_dom_cjs.registerTemplate)(
                new_event_tmpl
            );
            function new_group_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M15.8 28c-1.4-2.1-2.1-4.5-2.1-7.2 0-4.6 1.9-8.4 4.9-10.7-1-1.8-3-3.1-5.6-3.1-4.4 0-6.9 3.6-6.9 7.7 0 2.2.7 4.1 2.2 5.4.8.8 1.5 1.8 1.5 2.8 0 1-.4 2-2.9 3.1-3.6 1.6-6.9 3.8-7 7.1C0 35.3 1.4 37 3.5 37h3.3c.5 0 1-.3 1.3-.8 1.6-2.9 4.6-4.7 7.1-6 .9-.4 1.1-1.5.6-2.2zM45 26c-2.5-1.1-2.9-2-2.9-3.1s.7-2.1 1.5-2.8c1.5-1.4 2.2-3.2 2.2-5.4 0-4.1-2.4-7.7-6.9-7.7-2.6 0-4.6 1.3-5.7 3.1 3 2.3 4.9 6.1 4.9 10.7 0 2.7-.7 5.1-2.1 7.2-.5.8-.2 1.8.6 2.2 2.5 1.2 5.5 3.1 7.1 6 .3.5.8.8 1.3.8h3.3c2.1 0 3.5-1.7 3.5-3.9.1-3.3-3.2-5.5-6.8-7.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M32.6 33.3c-2.7-1.2-3.2-2.3-3.2-3.4 0-1.2.8-2.3 1.7-3.1 1.6-1.5 2.5-3.6 2.5-6 0-4.5-2.7-8.4-7.6-8.4-4.9 0-7.6 3.9-7.6 8.4 0 2.4.9 4.5 2.5 6 .9.9 1.7 2 1.7 3.1 0 1.2-.4 2.2-3.2 3.4-4 1.7-7.8 3.6-7.9 7.2 0 2.4 1.8 4.4 4.1 4.4h20.8c2.3 0 4.1-2 4.1-4.4-.1-3.6-3.9-5.4-7.9-7.2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_event_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_event_tmpl.stylesheets.push.apply(
                        new_event_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_event_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_event-host',
                    shadowAttribute: 'buildTemplates-action_new_event'
                });
            var new_group = Object(engine_dom_cjs.registerTemplate)(
                new_group_tmpl
            );
            function new_lead_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'circle',
                                    {
                                        attrs: {
                                            cx: '26',
                                            cy: '9.2',
                                            r: '7.2'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M48.4 21.2H3.6c-1.6 0-2.2 2-.9 2.9l11.7 7.5c.6.4.9 1.1.6 1.8L10.7 48c-.5 1.6 1.6 2.7 2.8 1.5l11.4-12c.6-.7 1.8-.7 2.4 0l11.4 12c1.1 1.2 3.2.1 2.8-1.5L37 33.3c-.2-.6.1-1.4.6-1.8L49.3 24c1.3-.8.7-2.8-.9-2.8z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_group_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_group_tmpl.stylesheets.push.apply(
                        new_group_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_group_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_group-host',
                    shadowAttribute: 'buildTemplates-action_new_group'
                });
            var new_lead = Object(engine_dom_cjs.registerTemplate)(
                new_lead_tmpl
            );
            function new_note_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M10 40v2.1c0 2.6 2.2 4.8 4.8 4.8h25.6c2.6 0 4.8-1.6 4.8-4.8h1.6c1.8 0 3.2-1.4 3.2-3.2 0-1.7-1.4-3.2-3.2-3.2h-1.6v-6.5h1.6c1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2h-1.6v-6.5h1.6c1.8 0 3.2-1.4 3.2-3.2s-1.4-3.3-3.2-3.3h-1.6C45.2 7.4 43 5 40.4 5H14.8C12.2 5 10 7.2 10 9.8v8.3c0 .4.3 1.1.6 1.4l10.8 11c.5.7 1.4 1.9 1.4 3.9v2.5c0 3.3-2.6 5.2-5 5.2h-2.6c-1.4 0-2.7-.5-3.7-1.5l-.9-.9c-.4-.3-.6-.2-.6.3zm8.8-24.5c0-.9.7-1.6 1.6-1.6h16c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6h-16c-.9 0-1.6-.7-1.6-1.6v-1.6zM26 34.9c0-.9.7-1.6 1.6-1.6h8.8c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6h-8.8c-.9 0-1.6-.7-1.6-1.6v-1.6zm-2.4-9.7c0-.9.7-1.6 1.6-1.6h11.2c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H25.2c-.9 0-1.6-.7-1.6-1.6v-1.6zm-21-.4l12.3 12.4c.1 0 .2.1.3.1h2.6c.2 0 .2-.2.2-.4v-2.7s0-.2-.1-.2L5.7 21.4c-.6-.6-1.6-.6-2.2 0l-1 1c-.7.7-.7 1.7.1 2.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_lead_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_lead_tmpl.stylesheets.push.apply(
                        new_lead_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_lead_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_lead-host',
                    shadowAttribute: 'buildTemplates-action_new_lead'
                });
            var new_note = Object(engine_dom_cjs.registerTemplate)(
                new_note_tmpl
            );
            function new_notebook_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M44 2H14c-2.2 0-4 1.8-4 4v3H7c-1.7 0-3 1.3-3 3s1.3 3 3 3h3v8H7c-1.7 0-3 1.3-3 3s1.3 3 3 3h3v8H7c-1.7 0-3 1.3-3 3s1.3 3 3 3h3v3c0 2.2 1.8 4 4 4h30c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4zm-7 34c0 .6-.4 1-1 1H22c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v2zm2-8c0 .6-.4 1-1 1H20c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2zm2-10c0 .6-.4 1-1 1H18c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_note_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_note_tmpl.stylesheets.push.apply(
                        new_note_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_note_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_note-host',
                    shadowAttribute: 'buildTemplates-action_new_note'
                });
            var new_notebook = Object(engine_dom_cjs.registerTemplate)(
                new_notebook_tmpl
            );
            function new_opportunity_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M41.8 41H10.2c-.8 0-1.4.7-1.4 1.4v.1c0 2.5 2 4.5 4.5 4.5h25.5c2.5 0 4.5-2 4.5-4.5v-.1c-.1-.7-.7-1.4-1.5-1.4zM45.5 10.2c-2.5 0-4.5 2-4.5 4.5 0 1.4.6 2.6 1.6 3.4-1.3 2.9-4.2 4.9-7.6 4.8-4-.2-7.2-3.4-7.4-7.4 0-.7 0-1.3.1-1.9 1.7-.7 2.9-2.2 2.9-4.2C30.5 7 28.5 5 26 5s-4.5 2-4.5 4.5c0 1.9 1.2 3.5 2.8 4.2.2.6.2 1.2.2 1.9-.2 4-3.4 7.2-7.4 7.4-3.4.2-6.4-1.9-7.7-4.8 1-.8 1.6-2.1 1.6-3.4 0-2.5-2-4.5-4.5-4.5S2 12.3 2 14.8s2 4.5 4.5 4.5l2.1 16c.1.7.7 1.2 1.4 1.2h32c.7 0 1.3-.5 1.4-1.2l2.1-16c2.5 0 4.5-2 4.5-4.5s-2-4.6-4.5-4.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_notebook_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_notebook_tmpl.stylesheets.push.apply(
                        new_notebook_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_notebook_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_notebook-host',
                    shadowAttribute: 'buildTemplates-action_new_notebook'
                });
            var new_opportunity = Object(engine_dom_cjs.registerTemplate)(
                new_opportunity_tmpl
            );
            function new_person_account_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M41.7 33.2c-2.9-1.2-3.4-2.3-3.4-3.5 0-1.2.8-2.3 1.8-3.2 1.7-1.5 2.6-3.7 2.6-6.2 0-4.6-3-8.7-8.2-8.7s-8.2 4-8.2 8.7c0 2.6 1 4.6 2.6 6.2 1 .9 1.8 2 1.8 3.2 0 1.2-.5 2.3-3.4 3.5-4.3 1.8-8.3 4-8.4 7.8 0 2.5 1.9 5 4.3 5h22.4c2.5 0 4.3-2.5 4.3-5 .2-3.7-3.9-6-8.2-7.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M23.4 27.1c-.3-.4-1.9-2.4-1.8-7.8.1-5.3 2.4-6.6 2.4-6.6V7.5c0-.9-.9-1.5-1.5-1.5h-19C2.8 6 2 6.7 2 7.6v34.9h10.8C13.1 33.6 23.3 30 23.3 30c1.5-.8.4-2.5.1-2.9zm-12.8 11c0 .9-.7 1.6-1.6 1.6H7.4c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H9c.9 0 1.6.7 1.6 1.6v1.6zm0-7.9c0 .9-.7 1.6-1.6 1.6H7.4c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H9c.9 0 1.6.7 1.6 1.6v1.6zm0-8c0 .9-.7 1.6-1.6 1.6H7.4c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H9c.9 0 1.6.7 1.6 1.6v1.6zm0-7.9c0 .9-.7 1.6-1.6 1.6H7.4c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H9c.9 0 1.6.7 1.6 1.6v1.6zm9 15.9c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H18c.9 0 1.6.7 1.6 1.6v1.6zm0-8c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H18c.9 0 1.6.7 1.6 1.6v1.6zm0-7.9c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6c0-.9.7-1.6 1.6-1.6H18c.9 0 1.6.7 1.6 1.6v1.6z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (new_opportunity_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_opportunity_tmpl.stylesheets.push.apply(
                        new_opportunity_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_opportunity_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_opportunity-host',
                    shadowAttribute: 'buildTemplates-action_new_opportunity'
                });
            var new_person_account = Object(engine_dom_cjs.registerTemplate)(
                new_person_account_tmpl
            );
            function new_task_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M1.9 16.8v-3.2c0-.9.7-1.6 1.6-1.6h16c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6h-16c-.9 0-1.6-.7-1.6-1.6zM1.9 31.1v-3.2c0-.9.7-1.6 1.6-1.6h20.8c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6H3.5c-.9 0-1.6-.7-1.6-1.6zM32.4 31.1v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6H34c-.9 0-1.7-.7-1.6-1.6zM32.4 45.4v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6H34c-.9 0-1.7-.7-1.6-1.6zM1.9 45.4v-3.2c0-.9.7-1.6 1.6-1.6h20.8c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6H3.5c-.9 0-1.6-.7-1.6-1.6zM49.7 7L48 5.3c-.5-.5-1.2-.5-1.7 0L35.7 15.8l-4.3-4.2c-.5-.5-1.2-.5-1.7 0L28 13.3c-.5.5-.5 1.2 0 1.7l5.9 5.9c.5.5 1.1.7 1.7.7s1.2-.2 1.7-.7L49.7 8.7c.4-.4.4-1.2 0-1.7z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_person_account_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_person_account_tmpl.stylesheets.push.apply(
                        new_person_account_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_person_account_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_new_person_account-host',
                    shadowAttribute: 'buildTemplates-action_new_person_account'
                });
            var new_task = Object(engine_dom_cjs.registerTemplate)(
                new_task_tmpl
            );
            function password_unlock_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M10 18.1v0zM42 23H16v-4.7c0-5.3 4-10 9.3-10.3 4.9-.3 9 2.8 10.3 7.2.1.4.5.8 1 .8h4.1c.6 0 1.1-.6 1-1.2C40.1 7.2 33.3 1.6 25.2 2c-8.5.4-15 7.7-15.2 16.1V23c-2.2 0-4 1.8-4 4v19c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V27c0-2.2-1.8-4-4-4zM30.6 42.7c.2.6-.3 1.3-1 1.3h-7.3c-.7 0-1.2-.6-1-1.3l1.8-6c-1.5-1-2.4-2.8-2-4.8.4-1.9 1.9-3.4 3.9-3.8 3.2-.6 6 1.7 6 4.7 0 1.6-.8 3.1-2.1 3.9l1.7 6z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (new_task_tmpl.stylesheets = []),
                empty_style_default.a &&
                    new_task_tmpl.stylesheets.push.apply(
                        new_task_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (new_task_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_new_task-host',
                    shadowAttribute: 'buildTemplates-action_new_task'
                });
            var password_unlock = Object(engine_dom_cjs.registerTemplate)(
                password_unlock_tmpl
            );
            function preview_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M51.8 25.1C47.1 15.6 37.3 9 26 9S4.9 15.6.2 25.1c-.3.6-.3 1.3 0 1.8C4.9 36.4 14.7 43 26 43s21.1-6.6 25.8-16.1c.3-.6.3-1.2 0-1.8zM26 37c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 19c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (password_unlock_tmpl.stylesheets = []),
                empty_style_default.a &&
                    password_unlock_tmpl.stylesheets.push.apply(
                        password_unlock_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (password_unlock_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_password_unlock-host',
                    shadowAttribute: 'buildTemplates-action_password_unlock'
                });
            var preview = Object(engine_dom_cjs.registerTemplate)(preview_tmpl);
            function priority_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M43 48.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5v-45c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v45zM3 8.5v23.2c0 .5.3 1 .8 1.3 16.7 9.4 14.7-8.2 33.9-1.8.6.3 1.3-.2 1.3-.9V7c0-.6-.4-1.2-1-1.4C18.7-1.1 20.5 16.1 4.5 7.7c-.7-.4-1.5.1-1.5.8z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (preview_tmpl.stylesheets = []),
                empty_style_default.a &&
                    preview_tmpl.stylesheets.push.apply(
                        preview_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (preview_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_preview-host',
                    shadowAttribute: 'buildTemplates-action_preview'
                });
            var priority = Object(engine_dom_cjs.registerTemplate)(
                priority_tmpl
            );
            function question_post_action_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M28.4 38h-5c-.8 0-1.4-.6-1.4-1.4v-1.5c0-4.2 2.7-8 6.7-9.4 1.2-.4 2.3-1.1 3.2-2.1 5-6 .4-13.2-5.6-13.4-2.2-.1-4.3.7-5.9 2.2-1.3 1.2-2.1 2.7-2.3 4.4-.1.6-.7 1.1-1.5 1.1h-5c-.9 0-1.6-.7-1.5-1.6.4-3.8 2.1-7.2 4.8-9.9 3.2-3 7.3-4.6 11.7-4.5C34.9 2.2 41.7 9 42 17.3c.3 7-4 13.3-10.5 15.7-.9.4-1.5 1.1-1.5 2v1.5c0 .9-.8 1.5-1.6 1.5zM30 48.5c0 .8-.7 1.5-1.5 1.5h-5c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5v5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (priority_tmpl.stylesheets = []),
                empty_style_default.a &&
                    priority_tmpl.stylesheets.push.apply(
                        priority_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (priority_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_priority-host',
                    shadowAttribute: 'buildTemplates-action_priority'
                });
            var question_post_action = Object(engine_dom_cjs.registerTemplate)(
                question_post_action_tmpl
            );
            function quote_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M35 23H17c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1zM33 32H19c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.8 12.3l-9.6-9.2c-.8-.7-1.8-1.1-2.8-1.1H18.6c-1 0-2 .4-2.8 1.1l-9.6 9.2c-.8.8-1.2 1.8-1.2 2.9V46c0 2.2 1.8 4 4 4h34c2.2 0 4-1.8 4-4V15.2c0-1.1-.4-2.1-1.2-2.9zM26 5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm15 37.5c0 .8-.7 1.5-1.5 1.5h-27c-.8 0-1.5-.7-1.5-1.5v-25c0-.8.7-1.5 1.5-1.5h27c.8 0 1.5.7 1.5 1.5v25z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (question_post_action_tmpl.stylesheets = []),
                empty_style_default.a &&
                    question_post_action_tmpl.stylesheets.push.apply(
                        question_post_action_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (question_post_action_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_question_post_action-host',
                    shadowAttribute:
                        'buildTemplates-action_question_post_action'
                });
            var quote = Object(engine_dom_cjs.registerTemplate)(quote_tmpl);
            function recall_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26.4 28.5c-.6.6-.6 1.6 0 2.2l2.2 2.2c.6.6 1.6.6 2.2 0l14.1-14.1c.6-.6.6-1.6 0-2.2l-14-14.1c-.6-.6-1.6-.6-2.2 0l-2.2 2.2c-.6.6-.6 1.6 0 2.2l5.9 5.8c1.7 1.9-1 1.8-1 1.8h-8.3c-9.9.1-18.3 8.2-18.1 18.1.2 9.6 8 17.4 17.7 17.4h3.6c.9 0 1.6-.8 1.6-1.6v-3.1c0-.9-.8-1.6-1.6-1.6h-3.4c-6 0-11.2-4.4-11.8-10.3-.6-6.9 4.8-12.6 11.5-12.6h9c.7.2 1 1.2.5 1.8l-5.7 5.9z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (quote_tmpl.stylesheets = []),
                empty_style_default.a &&
                    quote_tmpl.stylesheets.push.apply(
                        quote_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (quote_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_quote-host',
                    shadowAttribute: 'buildTemplates-action_quote'
                });
            var recall = Object(engine_dom_cjs.registerTemplate)(recall_tmpl);
            function record_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M36.1 10V6.8C36.1 4.2 34 2 31.4 2h-11c-2.6 0-4.7 2.2-4.7 4.8V10c0 .9.7 1.6 1.6 1.6h17.3c.9 0 1.6-.7 1.5-1.6zM4 10.8v34.4C4 47.8 6.1 50 8.7 50h34.6c2.6 0 4.7-2.2 4.7-4.8V10.8C48 8.2 45.9 6 43.3 6h-1.6c-.5 0-.8.3-.8.8V10c0 3.5-2.8 6.4-6.3 6.4H17.4c-3.5 0-6.3-2.9-6.3-6.4V6.8c0-.5-.3-.8-.8-.8H8.7C6.1 6 4 8.2 4 10.8zm30.6 28c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6zm0-8c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6zm0-8c0-.9.7-1.6 1.6-1.6h1.6c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6h-1.6c-.9 0-1.6-.7-1.6-1.6v-1.6zm-22 16c0-.9.7-1.6 1.6-1.6h15.7c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H14.2c-.9 0-1.6-.7-1.6-1.6v-1.6zm0-8c0-.9.7-1.6 1.6-1.6h15.7c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H14.2c-.9 0-1.6-.7-1.6-1.6v-1.6zm0-8c0-.9.7-1.6 1.6-1.6h15.7c.9 0 1.6.7 1.6 1.6v1.6c0 .9-.7 1.6-1.6 1.6H14.2c-.9 0-1.6-.7-1.6-1.6v-1.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (recall_tmpl.stylesheets = []),
                empty_style_default.a &&
                    recall_tmpl.stylesheets.push.apply(
                        recall_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (recall_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_recall-host',
                    shadowAttribute: 'buildTemplates-action_recall'
                });
            var record = Object(engine_dom_cjs.registerTemplate)(record_tmpl);
            function refresh_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (record_tmpl.stylesheets = []),
                empty_style_default.a &&
                    record_tmpl.stylesheets.push.apply(
                        record_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (record_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_record-host',
                    shadowAttribute: 'buildTemplates-action_record'
                });
            var refresh = Object(engine_dom_cjs.registerTemplate)(refresh_tmpl);
            function reject_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M31.6 25.8l13.1-13.1c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0L27.4 21.6c-.4.4-1 .4-1.4 0L12.9 8.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8.6 40.3c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L26 31.4c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L31.6 27.2c-.3-.4-.3-1 0-1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (refresh_tmpl.stylesheets = []),
                empty_style_default.a &&
                    refresh_tmpl.stylesheets.push.apply(
                        refresh_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (refresh_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_refresh-host',
                    shadowAttribute: 'buildTemplates-action_refresh'
                });
            var reject = Object(engine_dom_cjs.registerTemplate)(reject_tmpl);
            function remove_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M31.6 25.8l13.1-13.1c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0L27.4 21.6c-.4.4-1 .4-1.4 0L12.9 8.4c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8.6 40.3c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L26 31.4c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L31.6 27.2c-.3-.4-.3-1 0-1.4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (reject_tmpl.stylesheets = []),
                empty_style_default.a &&
                    reject_tmpl.stylesheets.push.apply(
                        reject_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (reject_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_reject-host',
                    shadowAttribute: 'buildTemplates-action_reject'
                });
            var remove = Object(engine_dom_cjs.registerTemplate)(remove_tmpl);
            function remove_relationship_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M36.001 20c0-2.2-1.799-4-4-4H6c-2.199 0-4 1.8-4 4v26c0 2.2 1.801 4 4 4h26.001c2.201 0 4-1.8 4-4V20zM11 35c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h16.001c.5 0 1 .5 1 1v2c0 .5-.5 1-1 1H11zm32.001 7h-3v-6h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1H17c-.6 0-1 .4-1 1v3h-6V9c0-3.9 3.102-7 7-7h26.001c3.9 0 7 3.1 7 7v26c0 3.9-3.1 7-7 7z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (remove_tmpl.stylesheets = []),
                empty_style_default.a &&
                    remove_tmpl.stylesheets.push.apply(
                        remove_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (remove_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_remove-host',
                    shadowAttribute: 'buildTemplates-action_remove'
                });
            var remove_relationship = Object(engine_dom_cjs.registerTemplate)(
                remove_relationship_tmpl
            );
            function reset_password_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M46.5 4h-3c-.8 0-1.5.7-1.5 1.5v7c0 .9-.5 1.3-1.2.7-.3-.4-.6-.7-1-1-5-5-12-7.1-19.2-5.7-2.5.5-4.9 1.5-7 2.9-6.1 4-9.6 10.5-9.7 17.5-.1 5.4 2 10.8 5.8 14.7 4 4.2 9.4 6.5 15.2 6.5 5.1 0 9.9-1.8 13.7-5 .7-.6.7-1.6.1-2.2l-2.1-2.1c-.5-.5-1.4-.6-2-.1-3.6 3-8.5 4.2-13.4 3-1.3-.3-2.6-.9-3.8-1.6C11.7 36.6 9 30 10.6 23.4c.3-1.3.9-2.6 1.6-3.8C15 14.7 19.9 12 25.1 12c4 0 7.8 1.6 10.6 4.4.5.4.9.9 1.2 1.4.3.8-.4 1.2-1.3 1.2h-7c-.8 0-1.5.7-1.5 1.5v3.1c0 .8.6 1.4 1.4 1.4h18.3c.7 0 1.3-.6 1.3-1.3V5.5C48 4.7 47.3 4 46.5 4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (remove_relationship_tmpl.stylesheets = []),
                empty_style_default.a &&
                    remove_relationship_tmpl.stylesheets.push.apply(
                        remove_relationship_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (remove_relationship_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_remove_relationship-host',
                    shadowAttribute: 'buildTemplates-action_remove_relationship'
                });
            var reset_password = Object(engine_dom_cjs.registerTemplate)(
                reset_password_tmpl
            );
            function script_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M44 6.8c-8.8 0-15.6 6.9-15.6 15.7v21.1c0 .8.7 1.5 1.5 1.5h16.7c.8 0 1.5-.7 1.5-1.5V27c0-.8-.7-1.5-1.5-1.5H34.2v-2.9c0-4.9 4.8-9.8 9.7-9.8h2.6c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H44zm-24.4 0C10.8 6.8 4 13.7 4 22.6v21.1c0 .8.7 1.5 1.5 1.5h16.7c.8 0 1.5-.7 1.5-1.5V27c0-.8-.7-1.5-1.5-1.5H9.9v-2.9c0-4.9 4.8-9.8 9.7-9.8h2.6c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-2.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (reset_password_tmpl.stylesheets = []),
                empty_style_default.a &&
                    reset_password_tmpl.stylesheets.push.apply(
                        reset_password_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (reset_password_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_reset_password-host',
                    shadowAttribute: 'buildTemplates-action_reset_password'
                });
            var script = Object(engine_dom_cjs.registerTemplate)(script_tmpl);
            function share_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M2 31.5V46c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4h-7.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h4c.8 0 1.5.7 1.5 1.5v21c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-11c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5zm13.4-17.6c-.9 0-1.3-1.1-.7-1.7l5.6-5.6c.6-.6.5-1.5-.1-2.1L18 2.4c-.6-.6-1.5-.6-2.1 0L2.4 15.9c-.6.6-.6 1.5 0 2.1L16 31.5c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1l-5.5-5.6c-.6-.6-.2-1.7.7-1.7H17c7.8 0 14.2 6.2 14.9 13.7.1.7.7 1.3 1.5 1.3h3c.9 0 1.6-.8 1.5-1.6C37.1 22.9 28 14 18 14c.1 0-2.6-.1-2.6-.1z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (script_tmpl.stylesheets = []),
                empty_style_default.a &&
                    script_tmpl.stylesheets.push.apply(
                        script_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (script_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_script-host',
                    shadowAttribute: 'buildTemplates-action_script'
                });
            var share = Object(engine_dom_cjs.registerTemplate)(share_tmpl);
            function share_file_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M41 16h7.8c.4 0 .7-.5.4-.9l-8.3-8.3c-.4-.3-.9 0-.9.4V15c0 .6.4 1 1 1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M49 20H38c-1.1 0-2-.9-2-2V7c0-.6-.4-1-1-1H21.5c-.8 0-1.5.7-1.5 1.5v4c0 .4.2.8.4 1.1l5.6 5.6c.8.8 1.4 1.9 1.6 3.1.2 1.6-.3 3.1-1.4 4.3L24.6 27c-.5.5-1 .8-1.6 1.1.7.3 1.5.5 2.3.6 2.6.2 4.7 2.4 4.7 5.1V36c0 1.4-.7 2.8-1.7 3.7-1 1-2.5 1.4-3.9 1.3-1.1-.1-2.1-.3-3.2-.5-.6-.2-1.2.3-1.2 1v3.1c0 .8.7 1.5 1.5 1.5h27c.8 0 1.5-.7 1.5-1.5V21c0-.6-.4-1-1-1z'
                                            },
                                            key: 4
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M26 35.9v-2.2c0-.6-.5-1-1.1-1.1-5.4-.5-9.9-5.1-9.9-10.8v-1.2c0-.6.8-1 1.2-.5l4 4c.4.4 1.1.4 1.5 0l1.5-1.5c.4-.4.4-1.1 0-1.5l-9.7-9.7c-.4-.4-1.1-.4-1.5 0l-9.7 9.7c-.4.4-.4 1.1 0 1.5l1.5 1.5c.4.4 1.1.5 1.5.1l4.2-4c.5-.5 1.4-.1 1.4.5v1.9c0 7.2 6.3 13.8 13.9 14.4.7 0 1.2-.5 1.2-1.1z'
                                            },
                                            key: 5
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (share_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_tmpl.stylesheets.push.apply(
                        share_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share-host',
                    shadowAttribute: 'buildTemplates-action_share'
                });
            var share_file = Object(engine_dom_cjs.registerTemplate)(
                share_file_tmpl
            );
            function share_link_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27.2 41.7l-2.1-.3c-.7-.1-1.4-.3-2.1-.6-.4-.1-.9 0-1.2.3l-.5.5c-2.9 2.9-7.6 3.2-10.6.6-3.4-2.9-3.5-8.1-.4-11.2l7.6-7.6c1-1 2.2-1.6 3.4-2 1.6-.4 3.3-.3 4.8.3.9.4 1.8.9 2.6 1.7.4.4.7.8 1 1.3.4.7 1.3.8 1.8.2l2.8-2.8c.4-.4.4-1 .1-1.5-.4-.6-.9-1.1-1.4-1.6-.7-.7-1.5-1.4-2.4-1.9-1.4-.9-3-1.5-4.7-1.8-3.1-.6-6.5-.1-9.3 1.4-1.1.6-2.2 1.4-3.1 2.3l-7.3 7.3C.9 31.6.5 40.2 5.6 45.6c5.3 5.8 14.3 5.9 19.8.4l2.5-2.5c.7-.5.2-1.7-.7-1.8z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M45.6 5.8c-5.5-5.1-14.1-4.7-19.3.6L24 8.6c-.7.7-.2 1.9.7 2 1.4.1 2.8.4 4.2.8.4.1.9 0 1.2-.3l.5-.5c2.9-2.9 7.6-3.2 10.6-.6 3.4 2.9 3.5 8.1.4 11.2L34 28.8c-1 1-2.2 1.6-3.4 2-1.6.4-3.3.3-4.8-.3-.9-.4-1.8-.9-2.6-1.7-.4-.4-.7-.8-1-1.3-.4-.7-1.3-.8-1.8-.2l-2.8 2.8c-.4.4-.4 1-.1 1.5.4.6.9 1.1 1.4 1.6.7.7 1.6 1.4 2.4 1.9 1.4.9 3 1.5 4.6 1.8 3.1.6 6.5.1 9.3-1.4 1.1-.6 2.2-1.4 3.1-2.3l7.6-7.6c5.6-5.5 5.4-14.5-.3-19.8z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (share_file_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_file_tmpl.stylesheets.push.apply(
                        share_file_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_file_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share_file-host',
                    shadowAttribute: 'buildTemplates-action_share_file'
                });
            var share_link = Object(engine_dom_cjs.registerTemplate)(
                share_link_tmpl
            );
            function share_poll_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M2 5.2v6.4c0 1.8 1.4 3.2 3.2 3.2h41.6c1.8 0 3.2-1.4 3.2-3.2V5.2C50 3.4 48.6 2 46.8 2H5.2C3.4 2 2 3.4 2 5.2zm3.2 6.4V5.2h20v6.4h-20zM2 22.8v6.4c0 1.8 1.4 3.2 3.2 3.2h41.6c1.8 0 3.2-1.4 3.2-3.2v-6.4c0-1.8-1.4-3.2-3.2-3.2H5.2C3.4 19.6 2 21 2 22.8zm3.2 6.4v-6.4h27.2v6.4H5.2zM2 40.4v6.4C2 48.6 3.4 50 5.2 50h41.6c1.8 0 3.2-1.4 3.2-3.2v-6.4c0-1.8-1.4-3.2-3.2-3.2H5.2c-1.8 0-3.2 1.4-3.2 3.2zm3.2 6.4v-6.4H18v6.4H5.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (share_link_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_link_tmpl.stylesheets.push.apply(
                        share_link_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_link_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share_link-host',
                    shadowAttribute: 'buildTemplates-action_share_link'
                });
            var share_poll = Object(engine_dom_cjs.registerTemplate)(
                share_poll_tmpl
            );
            function share_post_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 4C12.7 4 2 13.8 2 26c0 3.9 1.1 7.5 3 10.8.2.4.3.9.2 1.3L3 45c-.4 1.3.8 2.4 2.1 2l7-2.4c.5-.2 1-.1 1.4.2 3.7 2.1 8 3.3 12.6 3.3 13.3 0 24-9.8 24-22C49.8 13.8 39.1 4 26 4z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (share_poll_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_poll_tmpl.stylesheets.push.apply(
                        share_poll_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_poll_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share_poll-host',
                    shadowAttribute: 'buildTemplates-action_share_poll'
                });
            var share_post = Object(engine_dom_cjs.registerTemplate)(
                share_post_tmpl
            );
            function share_thanks_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45.2 14h-7c2-3.1 1.8-7.3-.6-9.8C36.2 2.8 34.4 2 32.5 2c-2.1 0-4.2 1-5.7 2.6-.3.3-.6.6-.8 1-.2-.4-.5-.7-.8-1A7.62 7.62 0 0019.5 2c-1.9 0-3.7.8-5 2.2-2.5 2.6-2.6 6.7-.6 9.8h-7C4.2 14 2 16.2 2 18.8V22c0 .9.7 1.6 1.6 1.6h44.8c.9 0 1.6-.7 1.6-1.6v-3.2c0-2.6-2.2-4.8-4.8-4.8zm-21.6 0c-1.7 0-4.1-.6-5.4-2.1-1.2-1.3-1.4-3.4-.2-4.4.5-.5 1-.6 1.5-.6.8 0 1.6.4 2.2 1 1.4 1.5 1.9 4.1 1.9 5.7v.4zm10.2-2.1C32.4 13.3 30 14 28.4 14v-.5c0-1.6.6-4.2 1.9-5.7.6-.6 1.4-1 2.2-1 .4 0 1 .1 1.6.6 1 1.2.9 3.2-.3 4.5zM45.2 28.4H28.4V50h13.8c2.6 0 4.6-2.1 4.6-4.6V30c0-.9-.7-1.6-1.6-1.6zM5.2 30v15.2c0 2.6 2.2 4.8 4.8 4.8h13.6V28.4H6.8c-.9 0-1.6.7-1.6 1.6z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (share_post_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_post_tmpl.stylesheets.push.apply(
                        share_post_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_post_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share_post-host',
                    shadowAttribute: 'buildTemplates-action_share_post'
                });
            var share_thanks = Object(engine_dom_cjs.registerTemplate)(
                share_thanks_tmpl
            );
            function sort_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27.5 16c.6-.6.6-1.5 0-2.1L16.1 2.4c-.6-.6-1.5-.6-2.1 0L2.5 13.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l3.6-3.6c.6-.6 1.7-.2 1.7.7v21.2c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.8 1.5-1.5V15.2c0-.9 1.1-1.3 1.7-.7l3.6 3.6c.6.6 1.5.6 2.1 0l2.1-2.1zM49.5 36l-2.1-2c-.6-.6-1.5-.6-2.1 0l-3.6 3.6c-.6.6-1.7.2-1.7-.7V15.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.8-1.5 1.5v21.2c0 .9-1.1 1.3-1.7.7l-3.6-3.6c-.6-.6-1.5-.6-2.1 0L24.5 36c-.6.6-.6 1.5 0 2.1L36 49.6c.6.6 1.5.6 2.1 0l11.5-11.5c.5-.6.5-1.6-.1-2.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (share_thanks_tmpl.stylesheets = []),
                empty_style_default.a &&
                    share_thanks_tmpl.stylesheets.push.apply(
                        share_thanks_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (share_thanks_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_share_thanks-host',
                    shadowAttribute: 'buildTemplates-action_share_thanks'
                });
            var sort = Object(engine_dom_cjs.registerTemplate)(sort_tmpl);
            function submit_for_approval_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M45.2 29.2h-8.8c-2.6 0-4.8-2.2-4.8-4.8.4-7.1 3.7-7.5 4-12.1.3-4.8-2.7-9.1-7.4-10.1C22 .9 16.4 5.6 16.4 11.6c0 5.3 3.6 5.3 4 12.8 0 2.6-2.2 4.8-4.8 4.8H6.8C4.2 29.2 2 31.3 2 34v3.2c0 .9.7 1.6 1.6 1.6h44.8c.9 0 1.6-.7 1.6-1.6V34c0-2.7-2.2-4.8-4.8-4.8zM45.3 43.6H6.7c-.9 0-1.5.7-1.5 1.5v.1c0 2.6 2.2 4.8 4.8 4.8h32.1c2.6 0 4.7-2.2 4.7-4.8v-.1c0-.8-.7-1.5-1.5-1.5z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (sort_tmpl.stylesheets = []),
                empty_style_default.a &&
                    sort_tmpl.stylesheets.push.apply(
                        sort_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (sort_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_sort-host',
                    shadowAttribute: 'buildTemplates-action_sort'
                });
            var submit_for_approval = Object(engine_dom_cjs.registerTemplate)(
                submit_for_approval_tmpl
            );
            function update_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm9 15.5c0 .8-.7 1.5-1.5 1.5H24c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h4c3.9 0 7 3.1 7 7v2c0 3.9-3.1 7-7 7h1v2c0 1.1-.9 2-2 2s-2-.9-2-2v-2h-6.5c-.8 0-1.5-.7-1.5-1.5v-3c0-.8.7-1.5 1.5-1.5H28c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-4c-3.9 0-7-3.1-7-7v-2c0-3.9 3.1-7 7-7h1v-2c0-1.1.9-2 2-2s2 .9 2 2v2h4.5c.8 0 1.5.7 1.5 1.5v3z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (submit_for_approval_tmpl.stylesheets = []),
                empty_style_default.a &&
                    submit_for_approval_tmpl.stylesheets.push.apply(
                        submit_for_approval_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (submit_for_approval_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_submit_for_approval-host',
                    shadowAttribute: 'buildTemplates-action_submit_for_approval'
                });
            var update = Object(engine_dom_cjs.registerTemplate)(update_tmpl);
            function update_status_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M29.5 27.9l-2.2-2.2c-.6-.6-1.6-.6-2.2 0L12.8 38.1c-.4.4-1.1.4-1.5 0l-4.4-4.5c-.6-.6-1.6-.6-2.2 0l-2.2 2.2c-.6.6-.6 1.6 0 2.2l8.5 8.6c.6.6 1.6.6 2.2 0l16.3-16.4c.7-.7.7-1.7 0-2.3z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M47 5.2H17c-1.7 0-3 1.3-3 3v23l8.2-8.3c1-1 2.4-1.6 3.9-1.6l.9-.1h14c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-8.6c1 1 1.5 2.3 1.6 3.6.1 1.6-.6 3.1-1.7 4.2l-.2.2H47c1.7 0 3-1.3 3-3v-22c0-1.7-1.3-3-3-3zm-5 11c0 .6-.4 1-1 1H23c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h18c.6 0 1 .4 1 1v2z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (update_tmpl.stylesheets = []),
                empty_style_default.a &&
                    update_tmpl.stylesheets.push.apply(
                        update_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (update_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_update-host',
                    shadowAttribute: 'buildTemplates-action_update'
                });
            var update_status = Object(engine_dom_cjs.registerTemplate)(
                update_status_tmpl
            );
            function upload_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M48.5 31h-3c-.8 0-1.5.8-1.5 1.5v10c0 .8-.7 1.5-1.5 1.5h-33c-.8 0-1.5-.7-1.5-1.5v-10c0-.7-.7-1.5-1.5-1.5h-3c-.8 0-1.5.8-1.5 1.5V46c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V32.5c0-.7-.7-1.5-1.5-1.5z'
                                            },
                                            key: 3
                                        },
                                        []
                                    ),
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27 2.4c-.6-.6-1.5-.6-2.1 0L11.4 15.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l5.6-5.6c.6-.6 1.8-.2 1.8.7v21.2c0 .8.6 1.5 1.4 1.5h3c.8 0 1.6-.8 1.6-1.5V15.3c0-.9 1-1.3 1.7-.7l5.6 5.6c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L27 2.4z'
                                            },
                                            key: 4
                                        },
                                        []
                                    )
                                ])
                            ])
                        ]
                    )
                ];
            }
            (update_status_tmpl.stylesheets = []),
                empty_style_default.a &&
                    update_status_tmpl.stylesheets.push.apply(
                        update_status_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (update_status_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_update_status-host',
                    shadowAttribute: 'buildTemplates-action_update_status'
                });
            var upload = Object(engine_dom_cjs.registerTemplate)(upload_tmpl);
            function user_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M50 43v2.2c0 2.6-2.2 4.8-4.8 4.8H6.8C4.2 50 2 47.8 2 45.2V43c0-5.8 6.8-9.4 13.2-12.2l.6-.3c.5-.2 1-.2 1.5.1 2.6 1.7 5.5 2.6 8.6 2.6s6.1-1 8.6-2.6c.5-.3 1-.3 1.5-.1l.6.3C43.2 33.6 50 37.1 50 43zM26 2c6.6 0 11.9 5.9 11.9 13.2S32.6 28.4 26 28.4s-11.9-5.9-11.9-13.2S19.4 2 26 2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (upload_tmpl.stylesheets = []),
                empty_style_default.a &&
                    upload_tmpl.stylesheets.push.apply(
                        upload_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (upload_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_upload-host',
                    shadowAttribute: 'buildTemplates-action_upload'
                });
            var user = Object(engine_dom_cjs.registerTemplate)(user_tmpl);
            function user_activation_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element('g', { key: 2 }, [
                                    api_element(
                                        'path',
                                        {
                                            attrs: {
                                                d: 'M27.5 16c.6-.6.6-1.5 0-2.1L16.1 2.4c-.6-.6-1.5-.6-2.1 0L2.5 13.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l3.6-3.6c.6-.6 1.7-.2 1.7.7v21.2c0 .8.7 1.6 1.5 1.6h3c.8 0 1.5-.9 1.5-1.6V15.2c0-.9 1.1-1.3 1.7-.7l3.6 3.6c.6.6 1.5.6 2.1 0l2.1-2.1zM49.5 36l-2.1-2c-.6-.6-1.5-.6-2.1 0l-3.6 3.6c-.6.6-1.7.2-1.7-.7V15.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.8-1.5 1.5v21.2c0 .9-1.1 1.3-1.7.7l-3.6-3.6c-.6-.6-1.5-.6-2.1 0L24.5 36c-.6.6-.6 1.5 0 2.1L36 49.6c.6.6 1.5.6 2.1 0l11.5-11.5c.5-.6.5-1.6-.1-2.1z'
                                            },
                                            key: 3
                                        },
                                        []
                                    )
                                ]),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M16 46h-2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zM38 12h-2c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2z'
                                        },
                                        key: 4
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (user_tmpl.stylesheets = []),
                empty_style_default.a &&
                    user_tmpl.stylesheets.push.apply(
                        user_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (user_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_user-host',
                    shadowAttribute: 'buildTemplates-action_user'
                });
            var user_activation = Object(engine_dom_cjs.registerTemplate)(
                user_activation_tmpl
            );
            function view_relationship_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M36 20c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4v26c0 2.2 1.8 4 4 4h26c2.2 0 4-1.8 4-4V20z'
                                        },
                                        key: 2
                                    },
                                    []
                                ),
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M43 42h-3v-6h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1H17c-.6 0-1 .4-1 1v3h-6V9c0-3.9 3.1-7 7-7h26c3.9 0 7 3.1 7 7v26c0 3.9-3.1 7-7 7z'
                                        },
                                        key: 3
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (user_activation_tmpl.stylesheets = []),
                empty_style_default.a &&
                    user_activation_tmpl.stylesheets.push.apply(
                        user_activation_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (user_activation_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_user_activation-host',
                    shadowAttribute: 'buildTemplates-action_user_activation'
                });
            var view_relationship = Object(engine_dom_cjs.registerTemplate)(
                view_relationship_tmpl
            );
            function web_link_tmpl($api, $cmp, $slotset, $ctx) {
                const { h: api_element } = $api;
                return [
                    api_element(
                        'svg',
                        {
                            className: $cmp.computedClass,
                            attrs: {
                                focusable: 'false',
                                'data-key': $cmp.name,
                                'aria-hidden': 'true',
                                viewBox: '0 0 52 52'
                            },
                            key: 0
                        },
                        [
                            api_element('g', { key: 1 }, [
                                api_element(
                                    'path',
                                    {
                                        attrs: {
                                            d: 'M27 2C13.7 2 3 12.7 3 26s10.7 24 24 24 24-10.7 24-24S40.3 2 27 2zm3 34.3c-1.5 1.5-2 4.4-2.6 6.4-.1.4-.4.8-.8 1l-1 .5c-.6.3-1.3.2-1.8-.3-1-.9-1.8-2.3-1.8-3.7 0-2.4-4-1.6-4-6.4 0-3.9-5-6.2-8.6-4.5-.3.1-.6.3-.9.3-.6.2-1.2-.2-1.3-.8C7.1 27.9 7 27 7 26c0-4.8 1.7-9.2 4.5-12.6 0-.1.1-.1.2-.1 2.4-2.8 5.5-5 9.1-6.2.9-.3 1.7.7 1.2 1.5-.4.6-.6 1.2-.6 1.7.1 2.1-1.9 3.4-2.8 3.1-.8-.3-3 1.1-1 2.1l1.1.5c.1 0 .2.1.2.1l.3.2c3.6 2.1 2.9 3.8 1.4 6.4-1.7 2.8-2.4 0-4.8-.8s-4.8.8-4 2.4c.8 1.6 3.2 0 4.8 1.6 1.6 1.6 1.6 4 6.4 2.4 4.8-1.6 5.6-.8 7.2.8 1.4 1.6 2.2 4.8-.2 7.2zm12.7-.2c-1.9-2.2 0-7.3-2.3-10.2-2.5-3.1-5.7.1-8.8-4.8-2.9-4.7.8-8.6 4.6-9.9 1-.4 2.1-.5 3.2-.5.2 0 .5.1.7.3 4.2 3.6 6.9 9 6.9 15 0 3.6-1 7-2.6 9.9-.4.6-1.2.7-1.7.2z'
                                        },
                                        key: 2
                                    },
                                    []
                                )
                            ])
                        ]
                    )
                ];
            }
            (view_relationship_tmpl.stylesheets = []),
                empty_style_default.a &&
                    view_relationship_tmpl.stylesheets.push.apply(
                        view_relationship_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (view_relationship_tmpl.stylesheetTokens = {
                    hostAttribute:
                        'buildTemplates-action_view_relationship-host',
                    shadowAttribute: 'buildTemplates-action_view_relationship'
                });
            var web_link = Object(engine_dom_cjs.registerTemplate)(
                web_link_tmpl
            );
            (web_link_tmpl.stylesheets = []),
                empty_style_default.a &&
                    web_link_tmpl.stylesheets.push.apply(
                        web_link_tmpl.stylesheets,
                        empty_style_default.a
                    ),
                (web_link_tmpl.stylesheetTokens = {
                    hostAttribute: 'buildTemplates-action_web_link-host',
                    shadowAttribute: 'buildTemplates-action_web_link'
                });
            var templates = {
                action_add_contact: add_contact,
                action_add_file: add_file,
                action_add_photo_video: add_photo_video,
                action_add_relationship: add_relationship,
                action_adjust_value: adjust_value,
                action_announcement: announcement,
                action_apex: apex,
                action_approval: approval,
                action_back: back,
                action_bug: bug,
                action_call: call,
                action_canvas: canvas,
                action_change_owner: change_owner,
                action_change_record_type: change_record_type,
                action_check: check,
                action_clone: clone,
                action_close: action_close,
                action_defer: defer,
                action_delete: action_delete,
                action_description: description,
                action_dial_in: dial_in,
                action_download: download,
                action_edit: edit,
                action_edit_groups: edit_groups,
                action_edit_relationship: edit_relationship,
                action_email: email,
                action_fallback: fallback,
                action_filter: filter,
                action_flow: flow,
                action_follow: follow,
                action_following: following,
                action_freeze_user: freeze_user,
                action_goal: goal,
                action_google_news: google_news,
                action_info: info,
                action_join_group: join_group,
                action_lead_convert: lead_convert,
                action_leave_group: leave_group,
                action_log_a_call: log_a_call,
                action_log_event: log_event,
                action_manage_perm_sets: manage_perm_sets,
                action_map: map,
                action_more: more,
                action_new: action_new,
                action_new_account: new_account,
                action_new_campaign: new_campaign,
                action_new_case: new_case,
                action_new_child_case: new_child_case,
                action_new_contact: new_contact,
                action_new_custom1: new_custom1,
                action_new_custom10: new_custom10,
                action_new_custom100: new_custom100,
                action_new_custom11: new_custom11,
                action_new_custom12: new_custom12,
                action_new_custom13: new_custom13,
                action_new_custom14: new_custom14,
                action_new_custom15: new_custom15,
                action_new_custom16: new_custom16,
                action_new_custom17: new_custom17,
                action_new_custom18: new_custom18,
                action_new_custom19: new_custom19,
                action_new_custom2: new_custom2,
                action_new_custom20: new_custom20,
                action_new_custom21: new_custom21,
                action_new_custom22: new_custom22,
                action_new_custom23: new_custom23,
                action_new_custom24: new_custom24,
                action_new_custom25: new_custom25,
                action_new_custom26: new_custom26,
                action_new_custom27: new_custom27,
                action_new_custom28: new_custom28,
                action_new_custom29: new_custom29,
                action_new_custom3: new_custom3,
                action_new_custom30: new_custom30,
                action_new_custom31: new_custom31,
                action_new_custom32: new_custom32,
                action_new_custom33: new_custom33,
                action_new_custom34: new_custom34,
                action_new_custom35: new_custom35,
                action_new_custom36: new_custom36,
                action_new_custom37: new_custom37,
                action_new_custom38: new_custom38,
                action_new_custom39: new_custom39,
                action_new_custom4: new_custom4,
                action_new_custom40: new_custom40,
                action_new_custom41: new_custom41,
                action_new_custom42: new_custom42,
                action_new_custom43: new_custom43,
                action_new_custom44: new_custom44,
                action_new_custom45: new_custom45,
                action_new_custom46: new_custom46,
                action_new_custom47: new_custom47,
                action_new_custom48: new_custom48,
                action_new_custom49: new_custom49,
                action_new_custom5: new_custom5,
                action_new_custom50: new_custom50,
                action_new_custom51: new_custom51,
                action_new_custom52: new_custom52,
                action_new_custom53: new_custom53,
                action_new_custom54: new_custom54,
                action_new_custom55: new_custom55,
                action_new_custom56: new_custom56,
                action_new_custom57: new_custom57,
                action_new_custom58: new_custom58,
                action_new_custom59: new_custom59,
                action_new_custom6: new_custom6,
                action_new_custom60: new_custom60,
                action_new_custom61: new_custom61,
                action_new_custom62: new_custom62,
                action_new_custom63: new_custom63,
                action_new_custom64: new_custom64,
                action_new_custom65: new_custom65,
                action_new_custom66: new_custom66,
                action_new_custom67: new_custom67,
                action_new_custom68: new_custom68,
                action_new_custom69: new_custom69,
                action_new_custom7: new_custom7,
                action_new_custom70: new_custom70,
                action_new_custom71: new_custom71,
                action_new_custom72: new_custom72,
                action_new_custom73: new_custom73,
                action_new_custom74: new_custom74,
                action_new_custom75: new_custom75,
                action_new_custom76: new_custom76,
                action_new_custom77: new_custom77,
                action_new_custom78: new_custom78,
                action_new_custom79: new_custom79,
                action_new_custom8: new_custom8,
                action_new_custom80: new_custom80,
                action_new_custom81: new_custom81,
                action_new_custom82: new_custom82,
                action_new_custom83: new_custom83,
                action_new_custom84: new_custom84,
                action_new_custom85: new_custom85,
                action_new_custom86: new_custom86,
                action_new_custom87: new_custom87,
                action_new_custom88: new_custom88,
                action_new_custom89: new_custom89,
                action_new_custom9: new_custom9,
                action_new_custom90: new_custom90,
                action_new_custom91: new_custom91,
                action_new_custom92: new_custom92,
                action_new_custom93: new_custom93,
                action_new_custom94: new_custom94,
                action_new_custom95: new_custom95,
                action_new_custom96: new_custom96,
                action_new_custom97: new_custom97,
                action_new_custom98: new_custom98,
                action_new_custom99: new_custom99,
                action_new_event: new_event,
                action_new_group: new_group,
                action_new_lead: new_lead,
                action_new_note: new_note,
                action_new_notebook: new_notebook,
                action_new_opportunity: new_opportunity,
                action_new_person_account: new_person_account,
                action_new_task: new_task,
                action_password_unlock: password_unlock,
                action_preview: preview,
                action_priority: priority,
                action_question_post_action: question_post_action,
                action_quote: quote,
                action_recall: recall,
                action_record: record,
                action_refresh: refresh,
                action_reject: reject,
                action_remove: remove,
                action_remove_relationship: remove_relationship,
                action_reset_password: reset_password,
                action_script: script,
                action_share: share,
                action_share_file: share_file,
                action_share_link: share_link,
                action_share_poll: share_poll,
                action_share_post: share_post,
                action_share_thanks: share_thanks,
                action_sort: sort,
                action_submit_for_approval: submit_for_approval,
                action_update: update,
                action_update_status: update_status,
                action_upload: upload,
                action_user: user,
                action_user_activation: user_activation,
                action_view_relationship: view_relationship,
                action_web_link: web_link
            };
            __webpack_exports__.default = Object(
                engine_dom_cjs.registerComponent
            )(templates, { tmpl: empty_style_default.a });
        }
    }
]);
