# OAuth 2.0 and Open ID Connect

## Objectives:
- Understand what OAuth v2.0 and Open ID Connect are and how they relate
- Understand the problem OAuth and Open ID Connect solves
- Understand the different types of applications and use cases OAuth applies to
- Be able to create a Web Server application that uses Google's OAuth and Open ID Connect services for authentication and authorization
- Be able to create a React SPA that uses Google's OAuth and Open ID Connect services for authentication and authorization

## What is OAuth 2.0 and Open ID Connect?

- Common needs for both Authentication and Authorization
  - Support multiple application use cases
    - browser-based App (SPA/PWA)
    - desktop App
    - Web-server-based App
    - Mobile app (native and hybrid)
    - Embedded devices (Smart TV's etc.)
    - User-less applications (not authenticated, tied to a user account)
    - Extensible to allow for future scenarios
  - Prevent System B from needing to store authentication data for User in System A
  - Prevent common hacking scenarios

- The Authentication Needs:
  - Allow User to log into System A, and have System A provide identity data to System B
  - System B trusts System A's authentication
  - Provides a Single Sign On experience to users, which is more convenient
  
- The Authorization Needs:
  - Allow User to authorize System B to use User's data in System A
  - Prevent System B from needing carte blanche access to User's data in System A (valet key metaphor)
  - Give User control over what System B can do with User's data in System A
  - Enable integrations
  
  ## OAuth Basics
  
  ### The players:
  - User
  - User Agent (typically the browser, or mobile device, etc.)
  - Client (software running on/in the User Agent - your user-facing application!)
    - Public Clients (sometimes called "insecure clients")
    - Confidential Clients (sometimes called "secure clients")
  - Resource Server (the third-party server that has User data - System B in our descriptions so far)
  - Resources (the actual User data in the third-party server - eg System B data)
  - Authorization Server (the OAuth server that issues and validates Authorization Codes, Access Tokens, and ID Tokens)
  - Client ID (an identifier for the Client - provided by the Authorizing System upon registering the Client)
  - Client Secret (a key "challenge" related to the Client ID - provided by the Authorizing System upon registering the Client, used in verifying an Authorization Code when it is presented to request an Access or Identity Token)
  - Access Token (a token the Client uses to access User data - a.k.a. Resources - in System B)
  - Identity Token (a.k.a. ID Token - a token the Client uses to identify the User)
  
  
  
  ## Open ID Basics
  
  ## Common Scenario/Use Case #1 : Web-server-based app
  
  ## Common Scenario/Use Case #2 : Browser-based app (React / React-Router)
  
  ## Other Use Cases
  
  ### Mobile applications (native and hybrid)
  
  - Applications on mobile devices register to handle incoming HTTP response URI's
  - OAuth requests for such apps receive responses to URI's that your mobile app is registered to handle
  - But there could be other apps registered to handle the same URI (eg malware)
  - When an authorization code arrives in response to a request, we can't guarantee that our app is the one to get it
  - The Implicit Flow is vulnerable to this kind of attack, and should not be used on mobile devices
  - The Authorization Code Flow with Proof Key for Code Exchange (a.k.a. PKCE, pronounced "pixie") should be used
  
  ### Devices with Embedded Apps (eg Smart TV's)
  
  - The Device Flow was designed for this use case
  - Involves directing the user to an online location using a different device (mobile or laptop/desktop)
  - Provides a "device authorization code" that the user must enter in the online location
  - The device must regularly poll to see if the user has entered the authorization code
  
  ## Other Topics
  
  ### Security and Vulnerability
  - https://tools.ietf.org/html/draft-ietf-oauth-security-topics-16
  - https://tools.ietf.org/html/rfc6819
  - There are dozens of potential threats and attacks, and many recommendations for the Client, the Authorization Server, and the Resource Server.
  
  ### Token Lifetime Management
  - manually expiring access and id tokens
  - refresh expired access and id tokens
  - revoking active access and id tokens
  
  ### IANA Considerations
  
