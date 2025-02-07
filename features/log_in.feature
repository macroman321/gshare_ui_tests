#
# FILE NAME: log_in.feature
# DESCRIPTION: log_in FEATURE
# AUTHOR: Dragan Nikolić (DN)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Log in

  @all_env
  Scenario: Log in with email
    When I log in as user "qa_user_2" without Remember me
    Then I should see the user has been successfully logged in

  @all_env
  Scenario: Log in with username
    When I log in with username as user "qa_user_2" without Remember me
    Then I should see the user has been successfully logged in

  @wip
  Scenario Outline: Try to log in with an incorrect password
    When I enter email for "qa_user_1" and password "<password>"
    Then I should see login has failed with "<message>"

    Examples:
      | password     | message                                     |
      | QAxxxx1111&& | Cannot login using the supplied credentials |
      | p123         | Minimum 8 symbols                           |

  @manual
  ### Coming in a later update ###
  Scenario: Log in with 2FA (coming in a later update)

  @manual
  ### Coming in a later update ###
  Scenario: Try to log in with an incorrect 2FA code

  @manual
  ### Coming in a later update ###
  Scenario: Log in with Email 2FA
