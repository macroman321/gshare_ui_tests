#
# FILE NAME: log_in.feature
# DESCRIPTION: log_in FEATURE
# AUTHOR: Dragan Nikolić (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Log in

  Background:

  @all_env
  Scenario: Log in
    When I log in as user "qa_user_1"

  @manual
  Scenario: Log in with TFA

  @manual
  Scenario: Log in with Email TFA

  @manual
  Scenario: Try to log in with an incorrect TFA code
    When I enter a valid credentials
    And I enter a wrong TFA code
    Then I should see notification that says TFA code is wrong

  @all_env
  Scenario Outline: Try to log in with an incorrect password
    When I start GameClient
    And I enter email of the user "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |
