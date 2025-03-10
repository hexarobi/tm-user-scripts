// ==UserScript==
// @name         The Zebra Gitlab Conventional Commits Verifier
// @namespace    http://thezebra.com/
// @version      1.0
// @author       Patrick Pease <ppease@thezebra.com>
// @description  Enforces that MR titles are using conventional commits
// @match        https://gitlab.com/thezebra/*/merge_requests/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const MERGE_BUTTON = '[data-testid=merge-button]';
const MR_TITLE = '[data-testid="title-content"]';

waitForKeyElements (MERGE_BUTTON, function() {
    'use strict';
    const mrTitle = document.querySelector(MR_TITLE);
    if (!mrTitle) {
        return;
    }
    const mrTitleText = mrTitle.textContent.trim();
    if (mrTitleText !== null && mrTitleText !== "") {
        const convCommitRegex = /^(fix|feat|build|chore|ci|docs|style|refactor|perf|test|BREAKING CHANGE)(\([^)]+\))?!?:\s.+/;
        const isConventionalCommit = convCommitRegex.test(mrTitleText);
        let merge_button = document.querySelector(MERGE_BUTTON);
        const should_disable = !isConventionalCommit
        merge_button.disabled = should_disable;
        let buttonTitleText = "";
        if (should_disable) {
            buttonTitleText = "This MR title is not following conventional commits";
        }
        merge_button.title = buttonTitleText;
    }
});
