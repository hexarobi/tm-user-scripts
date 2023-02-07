// ==UserScript==
// @name         The Zebra Gitlab MR Utilities
// @namespace    http://thezebra.com/
// @version      1.0
// @author       Patrick Pease <ppease@thezebra.com>
// @description  Adds useful utilities for Gitlab merge requests
// @updateURL    https://github.com/hexarobi/tm-user-scripts/raw/main/gitlab_mr_tools.user.js
// @downloadURL  https://github.com/hexarobi/tm-user-scripts/raw/main/gitlab_mr_tools.user.js
// @grant        GM_addStyle
// @match        https://gitlab.com/thezebra/*/merge_requests/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==

// ==/UserScript==


'use strict';

// This is the section where you can add your own groups.
const GROUPS_TO_REVIEWERS = {
    "Modify the group!": ["empty"],
//     "Other_Group": ["test","other"],
};
const SELECTOR_FOR_EDIT_BUTTON = "[data-qa-selector=reviewers_edit_button]";
const SELECTOR_FOR_DROPDOWN_MENU_PARENT = "[data-qa-selector=reviewers_block_container]";
const ADD_GROUP_BUTTON_ID = "thezebra-add-group-button";
const ADD_GROUP_DROPDOWN_ID = "thezebra-add-group-dropdown";
const DROPDOWN_BUTTON_CLASS = "thezebra-dropdown-button";
const GITLAB_GRAPHQL_URL = "https://gitlab.com/api/graphql";

waitForKeyElements (SELECTOR_FOR_EDIT_BUTTON, function() {
    'use strict';

    function HideOrShowReviewerList() {
      let popupMenuParent = document.querySelector(SELECTOR_FOR_DROPDOWN_MENU_PARENT);
      let reviewerList = popupMenuParent.querySelector(".value");
      let groupDropDown = document.getElementById(ADD_GROUP_DROPDOWN_ID);
      if (groupDropDown.classList.contains("dropdown")) {
          reviewerList.style = "display:none";
      } else {
          reviewerList.style = "display:block";
      }
    }

    function AddGroupButton() {
      let addGroupButton = document.createElement ('a');
      addGroupButton.setAttribute ('id', ADD_GROUP_BUTTON_ID);
      addGroupButton.setAttribute ('class', 'btn gl-text-gray-900! gl-ml-auto btn-default btn-sm gl-button btn-default-tertiary float-right');
      addGroupButton.textContent = "Add Group";
      let editButton = document.querySelector(SELECTOR_FOR_EDIT_BUTTON);
      editButton.parentElement.appendChild(addGroupButton, editButton);

      //--- Activate button.
      document.getElementById(ADD_GROUP_BUTTON_ID).addEventListener("click", AddGroupClick, false);
      function AddGroupClick (zEvent) {
        let groupDropDown = document.getElementById(ADD_GROUP_DROPDOWN_ID);
        groupDropDown.classList.toggle("dropdown");
        HideOrShowReviewerList(groupDropDown);
      }
    }

    function CreateHtmlListForGroups() {
      let groupHtml = "<ul>";
      const itemToReplace = "REPLACE+ME";
      const formatString = `<li> <a href="#" class="dropdown-menu-user-link gl-display-flex! gl-align-items-center ${DROPDOWN_BUTTON_CLASS}">${itemToReplace}</a> </li>`;
      for (let group in GROUPS_TO_REVIEWERS) {
          groupHtml += formatString.replace(itemToReplace, group);
      }
      groupHtml += "</ul>";
      return groupHtml;
    }

    function CreateDropDownMenu() {
      let dropdownMenu = document.createElement('div');
      dropdownMenu.setAttribute ('id', ADD_GROUP_DROPDOWN_ID);

      let groupHtml = CreateHtmlListForGroups();
      dropdownMenu.innerHTML = `
        <div class="dropdown-menu dropdown-select dropdown-menu-user dropdown-menu-selectable dropdown-menu-author dropdown-extended-height show">
          <div class="dropdown-title">
            <span>Add Group</span>
          </div>
          <div data-qa-selector="dropdown_list_content" class="dropdown-content ">
            ${groupHtml}
          </div>
        </div>
      `;

      return dropdownMenu;
    }

    function HideDropDownMenu(dropDownMenu) {
      if (dropDownMenu.classList.contains('dropdown')) {
        dropDownMenu.classList.remove('dropdown');
        HideOrShowReviewerList(dropDownMenu);
      }
    }

    function RegisterToCloseDropdownOutsideDropDown(dropDownMenu) {
      window.onclick = function(event) {
        if (!dropDownMenu.contains(event.target) && !event.target.matches(`#${ADD_GROUP_BUTTON_ID}`)) {
          HideDropDownMenu(dropDownMenu);
        }
      }
    }

    function CalculateProjectPathAndIID() {
      // Example URL should be something like:
      //     https://gitlab.com/thezebra/scratch/gitlab-tampermonkey/-/merge_requests/235
      //     https://gitlab.com/thezebra/scratch/gitlab-tampermonkey/-/merge_requests/1/commits
      // We want the projectPath to be `thezebra/scratch/gitlab-tampermonkey` and the merge request ID 
      // to be the number at the end (235). Regex returns match followed by groups.
      const regex = /^https:\/\/gitlab\.com\/(thezebra.*)\/-\/merge_requests\/(\d+)\/*/;
      let result = window.location.href.match(regex);
      return { 
        projectPath: result[1],
        mergeRequestId: result[2]
      }
    }

    async function GetCurrentUser(csrfToken) {
      let graphqlBody = {
        query: `
          query GetCurrentUser {
            currentUser {
              username
            }
          }`
      };
      const response = await fetch(GITLAB_GRAPHQL_URL, {
        "headers": {
          "accept": "*/*",
          "content-type": "application/json",
          "x-csrf-token": csrfToken,
        },
        "body": JSON.stringify(graphqlBody),
        "method": "POST"
      });
      const graphqlData = await response.json();
      return graphqlData["data"]["currentUser"]["username"];
    }

    async function AddGroupToMergeRequest(groupToAdd) {
      let csrfToken = document.head.querySelector("[name=csrf-token][content]").content;
      let currentUser = await GetCurrentUser(csrfToken);
      let reviewersToAdd = GROUPS_TO_REVIEWERS[groupToAdd].filter((reviewer) => reviewer !== currentUser);
      let { projectPath, mergeRequestId } = CalculateProjectPathAndIID();
      let graphqlBody = {
        query: `
          mutation UpdateReviewersFromGroup($input: MergeRequestSetReviewersInput!) {
            mergeRequestSetReviewers(input: $input) {
              errors
            }
          }`,
        variables: {
          input: {
            projectPath: projectPath,
            iid: mergeRequestId,
            clientMutationId: "thezebra-tampermonkey-mr-utilities",
            reviewerUsernames: reviewersToAdd
          }
        },
        operationName: "UpdateReviewersFromGroup"
      };

      fetch(GITLAB_GRAPHQL_URL, {
        "headers": {
          "accept": "*/*",
          "content-type": "application/json",
          "x-csrf-token": csrfToken,
        },
        "body": JSON.stringify(graphqlBody),
        "method": "POST"
      });
    }

    function GroupButtonOnClick(event) {
      let groupToAdd = event.target.textContent;
      AddGroupToMergeRequest(groupToAdd);
      let groupDropDown = document.getElementById(ADD_GROUP_DROPDOWN_ID);
      HideDropDownMenu(groupDropDown);
    }

    function RegisterOnClickForGroupButtons() {
      let buttons = document.getElementsByClassName(DROPDOWN_BUTTON_CLASS);
      console.log(buttons);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", GroupButtonOnClick, false);
      }
    }

    function AddDropDownMenu() {
      let dropdownMenu = CreateDropDownMenu();
      let dropdownMenuParent = document.querySelector(SELECTOR_FOR_DROPDOWN_MENU_PARENT);
      dropdownMenuParent.appendChild(dropdownMenu);
      RegisterOnClickForGroupButtons();
      RegisterToCloseDropdownOutsideDropDown(dropdownMenu);
    }

    AddGroupButton();
    AddDropDownMenu();
});
