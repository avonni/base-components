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
import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-base-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({
    disabled,
    fieldLevelHelp,
    label,
    hideLabel,
    variant,
    messageWhenValueMissing,
    name,
    readOnly,
    required,
    value,
    startTime,
    endTime,
    timeSlotDuration,
    timeFormatHour,
    timeFormatHour12,
    timeFormatMinute,
    timeFormatSecond,
    dateFormatDay,
    dateFormatWeekday,
    dateFormatMonth,
    dateFormatYear,
    showEndTime,
    showDisabledDates,
    disabledDateTimes,
    max,
    min,
    type,
    showTimeZone,
    hideNavigation,
    hideDatePicker
}) => {
    const element = document.createElement('ac-base-date-time-picker');
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.hideLabel = hideLabel;
    element.variant = variant;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.value = value;
    element.startTime = startTime;
    element.endTime = endTime;
    element.timeSlotDuration = timeSlotDuration;
    element.timeFormatHour = timeFormatHour;
    element.timeFormatHour12 = timeFormatHour12;
    element.timeFormatMinute = timeFormatMinute;
    element.timeFormatSecond = timeFormatSecond;
    element.dateFormatDay = dateFormatDay;
    element.dateFormatWeekday = dateFormatWeekday;
    element.dateFormatMonth = dateFormatMonth;
    element.dateFormatYear = dateFormatYear;
    element.showEndTime = showEndTime;
    element.showDisabledDates = showDisabledDates;
    element.disabledDateTimes = disabledDateTimes;
    element.max = max;
    element.min = min;
    element.type = type;
    element.showTimeZone = showTimeZone;
    element.hideNavigation = hideNavigation;
    element.hideDatePicker = hideDatePicker;
    return element;
};
