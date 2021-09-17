/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';

const DEFAULT_WIDTHS_MODE = 'fixed';
const DEFAULT_SORT_DIRECTION = 'asc';
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_MAX_COLUMN_WIDTH = 1000;
const DEFAULT_MIN_COLUMN_WIDTH = 50;
const DEFAULT_RESIZE_STEP = 10;
const DEFAULT_ROW_NUMBER_OFFSET = 0;

export default class Datatable extends LightningElement {
    @api columnWidthsMode = DEFAULT_WIDTHS_MODE;
    @api columns;
    @api records;
    @api defaultSortDirection = DEFAULT_SORT_DIRECTION;
    @api draftValues;
    @api enableInfiniteLoading = false;
    @api errors;
    @api groupBy;
    @api hideCheckboxColumn = false;
    @api hideCollapsibleIcon = false;
    @api hideTableHeader = false;
    @api hideUndefinedGroup = false;
    @api isLoading = false;
    @api keyField;
    @api loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    @api maxColumnWidth = DEFAULT_MAX_COLUMN_WIDTH;
    @api maxRowSelection;
    @api minColumnWidth = DEFAULT_MIN_COLUMN_WIDTH;
    @api renderConfig;
    @api resizeColumnDisabled = false;
    @api resizeStep = DEFAULT_RESIZE_STEP;
    @api rowNumberOffset = DEFAULT_ROW_NUMBER_OFFSET;
    @api selectedRows = [];
    @api showRowNumberColumn = false;
    @api sortedBy;
    @api sortedDirection;
    @api suppressBottomBar = false;
}
