#
# FILE NAME: log_in.feature
# DESCRIPTION: log_in FEATURE
# AUTHOR: Dragan Nikolić (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Log in

  Background:


  Scenario: Log in
    When I log in as user "qa_user_1"

  @manual
  Scenario: Log in with TFA

  @manual
  Scenario: Log in with Email TFA

  @manual
  Scenario: Test invalid verification code
    When I enter a valid credentials
    And I enter a wrong 2FA code
    Then I should see notification that 2FA code is wrong

  Scenario Outline: Incorrect password is not accepted
    When I start GameClient
    And I enter email of the user "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |
