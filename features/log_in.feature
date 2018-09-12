#
# FILE NAME: log_in.feature
# DESCRIPTION: log_in FEATURE
# AUTHOR: Dragan Nikolić (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Log in

  @all_env
  Scenario: Log in
    When I log in as user "qa_user_1"

  @all_env
  Scenario Outline: Try to log in with an incorrect password
    When I start GShare
    And I enter email of the user "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |

  @manual
  ### coming in a later update ###
  Scenario: Log in with 2FA (coming in a later update)

  @manual
  ### coming in a later update ###
  Scenario: Try to log in with an incorrect 2FA code

  @manual
  ### coming in a later update ###
  Scenario: Log in with Email 2FA
