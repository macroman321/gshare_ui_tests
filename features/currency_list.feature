#
# FILE NAME: currency_list.feature
# DESCRIPTION: currency_list FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 10-Apr-18
# NOTES:
#

Feature: Verify Currency list

  Background:
    Given I start GameClient
    And I enter credentials for the user "qa_user_5" without Remember Me
    Then I should see the user is logged in

  Scenario: Remember Me feature test
    When I click on my profile
    Then I should see my balance displayed in other currencies