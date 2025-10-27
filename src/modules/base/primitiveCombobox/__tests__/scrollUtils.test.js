import { computeScroll, getTopOption, isOutsideOfView } from '../scrollUtils';

describe('Primitive Combobox: Scroll Utils', () => {
    describe('computeScroll()', () => {
        const mockList = {
            scrollHeight: 1000,
            clientHeight: 100
        };

        const loadMoreOffset = 20;

        it('No scroll', () => {
            const list = {
                ...mockList,
                scrollTop: 500
            };

            const result = computeScroll({
                list,
                loadMoreOffset,
                nbOptions: 100,
                previousStartIndex: 30,
                previousEndIndex: 60
            });

            expect(result).toEqual({
                loadDown: false,
                loadMore: false,
                startIndex: undefined,
                endIndex: undefined
            });
        });

        describe('Load down', () => {
            it('Load down when scroll is equal to the bottom limit', () => {
                const list = {
                    ...mockList,
                    scrollTop: 880
                };

                const result = computeScroll({
                    list,
                    loadMoreOffset,
                    nbOptions: 100,
                    previousStartIndex: 0,
                    previousEndIndex: 30
                });

                expect(result).toEqual({
                    loadDown: true,
                    loadMore: false,
                    startIndex: 10,
                    endIndex: 40
                });
            });

            it('Load down when scroll is greater than the bottom limit', () => {
                const list = {
                    ...mockList,
                    scrollTop: 2000
                };

                const result = computeScroll({
                    list,
                    loadMoreOffset,
                    nbOptions: 100,
                    previousStartIndex: 0,
                    previousEndIndex: 30
                });

                expect(result).toEqual({
                    loadDown: true,
                    loadMore: false,
                    startIndex: 10,
                    endIndex: 40
                });
            });

            it('Load more', () => {
                const list = {
                    ...mockList,
                    scrollTop: 980
                };

                const result = computeScroll({
                    list,
                    loadMoreOffset,
                    nbOptions: 45,
                    previousStartIndex: 5,
                    previousEndIndex: 35
                });
                expect(result).toEqual({
                    loadDown: true,
                    loadMore: true,
                    startIndex: 5,
                    endIndex: 45
                });
            });
        });

        describe('Load up', () => {
            it('Load up when scroll is equal to the top limit', () => {
                const list = {
                    ...mockList,
                    scrollTop: 20
                };

                const result = computeScroll({
                    list,
                    loadMoreOffset,
                    nbOptions: 100,
                    previousStartIndex: 10,
                    previousEndIndex: 40
                });

                expect(result).toEqual({
                    loadDown: false,
                    loadMore: false,
                    startIndex: 0,
                    endIndex: 30
                });
            });

            it('Load up when scroll is less than the top limit', () => {
                const list = {
                    ...mockList,
                    scrollTop: 0
                };

                const result = computeScroll({
                    list,
                    loadMoreOffset,
                    nbOptions: 100,
                    previousStartIndex: 5,
                    previousEndIndex: 35
                });

                expect(result).toEqual({
                    loadDown: false,
                    loadMore: false,
                    startIndex: 0,
                    endIndex: 30
                });
            });
        });
    });

    describe('getTopOption()', () => {
        const mockList = {
            getBoundingClientRect: () => ({
                top: 180
            })
        };

        const topActionsHeight = 50;

        it('Return the first option that intersects with the top position', () => {
            const groupElements = [
                {
                    optionElements: [
                        {
                            dataset: { value: 'option1' },
                            getBoundingClientRect: () => ({
                                top: 150,
                                bottom: 200
                            })
                        },
                        {
                            dataset: { value: 'option2' },
                            getBoundingClientRect: () => ({
                                top: 200,
                                bottom: 250
                            })
                        }
                    ]
                },
                {
                    optionElements: [
                        {
                            dataset: { value: 'option3' },
                            getBoundingClientRect: () => ({
                                top: 250,
                                bottom: 300
                            })
                        }
                    ]
                }
            ];

            const result = getTopOption({
                list: mockList,
                groupElements,
                topActionsHeight
            });

            expect(result).toEqual({
                value: 'option2',
                offset: 30
            });
        });

        it('Return the first option when no option intersects with the top position', () => {
            const groupElements = [
                {
                    optionElements: [
                        {
                            dataset: { value: 'option1' },
                            getBoundingClientRect: () => ({
                                top: 240,
                                bottom: 290
                            })
                        },
                        {
                            dataset: { value: 'option2' },
                            getBoundingClientRect: () => ({
                                top: 290,
                                bottom: 340
                            })
                        }
                    ]
                }
            ];

            const result = getTopOption({
                list: mockList,
                groupElements,
                topActionsHeight
            });

            expect(result).toEqual({ value: 'option1', offset: 0 });
        });

        it('Return null when there are no options', () => {
            const groupElements = [
                { optionElements: [] },
                { optionElements: [] }
            ];

            const result = getTopOption({
                list: mockList,
                groupElements,
                topActionsHeight
            });

            expect(result).toBeNull();
        });
    });

    describe('isOutsideOfView()', () => {
        const mockList = {
            getBoundingClientRect: () => ({
                top: 100,
                bottom: 300
            })
        };

        describe('False', () => {
            it('Option is completely inside the list bounds', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 150,
                        bottom: 250
                    })
                };
                expect(isOutsideOfView(mockOption, mockList)).toBe(false);
            });
        });

        describe('True', () => {
            it('Option top is above the list top', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 50,
                        bottom: 250
                    })
                };

                expect(isOutsideOfView(mockOption, mockList)).toBe(true);
            });

            it('Option bottom is below the list bottom', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 150,
                        bottom: 350
                    })
                };

                expect(isOutsideOfView(mockOption, mockList)).toBe(true);
            });

            it('Option is completely above the list', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 20,
                        bottom: 80
                    })
                };

                expect(isOutsideOfView(mockOption, mockList)).toBe(true);
            });

            it('Option is completely below the list', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 320,
                        bottom: 380
                    })
                };

                expect(isOutsideOfView(mockOption, mockList)).toBe(true);
            });

            it('Option spans outside both top and bottom', () => {
                const mockOption = {
                    getBoundingClientRect: () => ({
                        top: 50,
                        bottom: 350
                    })
                };

                expect(isOutsideOfView(mockOption, mockList)).toBe(true);
            });
        });
    });
});
