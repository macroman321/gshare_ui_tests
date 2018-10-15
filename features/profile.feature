#
# FILE NAME: profile.feature
# DESCRIPTION: profile FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: Profile

  Background:
    Given I log in as user "qa_user_3"

  @wip
  Scenario: Verify profile elements
    When I click on my profile
    Then I should see all the options I can interact with in the Profile menu

  @all_env
  Scenario: Sign out
    Then I should see the user has been successfully logged in
    When I log out of the application
    Then I should see the user has been successfully logged out

  @wip
  Scenario Outline: Verify profile links send you to the intended website (Account settings, FAQ, Discord support) 
    When I click on my profile
    And I click on a <link> I want to visit
    Then I should see that I am sent to the appropriate Web page

    Examples:
      | link             |
      | Account settings |
      | FAQ              |
      | Discord support  |

  @wip
  Scenario Outline: Change language
    When I click on my profile
    And I click on <language> from the language dropdown menu
    Then I should see everything translated in to <language>
    When I click on English in the dropdown menu
    Then I should see everything translated back to English

    Examples:
      | language |
      | English  |
      | Russian  |
