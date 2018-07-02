#
# FILE NAME: change_language.feature
# DESCRIPTION: change_language FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: Change language

  #Background:
  #  Given I log in as user "qa_user_5"

  @manual
  Scenario: Change language
    When I log into GShare
    And I click on the my profile button
    And I click on Russian from the language dropdown
    Then I should see everything translated to Russian
    When I click on English in the dropdown
    Then I should see everything translated back to English