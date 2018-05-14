#
# FILE NAME: profile.feature
# DESCRIPTION: profile FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: Profile

  Background:
    Given I log in as user "qa_user_5"

  @manual
  Scenario: Verify profile elements

  Scenario: Currency List
    When I click on my profile
    Then I should see the appropriate amount displayed for the selected currency

  @manual
  Scenario: Verify GAME value via CoinMarketCap
    When I click on my profile
    Then I should see my balance displayed in other currencies
    When I get the current GAME value from CoinMarketCap
    And I multiply my balance with current GAME value
    Then I should see my calculation number match the number in my currency list
