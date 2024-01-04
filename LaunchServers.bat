@Echo Off

ECHO "------------------------------------------------------------------"
ECHO "Create project variable environment"
ECHO "------------------------------------------------------------------"
SET CHECKERS_PROJECT=%cd%
SET CHECKERS_PROJECT_CLIENT=%CHECKERS_PROJECT%\Client
SET CHECKERS_PROJECT_SERVEUR=%CHECKERS_PROJECT%\Serveur
SET CHECKERS_PROJECT_DB=%CHECKERS_PROJECT_SERVEUR%\db
IF NOT EXIST %CHECKERS_PROJECT_DB% (
    ECHO "Database directory doesn't exist, create it"
    mkdir %CHECKERS_PROJECT_DB%
)

ECHO "Open servers in new cmd terminal"

start cmd /k ^
    ECHO "------------------------------------------------------------------" ^&^
    ECHO "Run Database Server" ^&^
    ECHO "------------------------------------------------------------------" ^&^
    call conda activate DevWeb ^&^
    cd %CHECKERS_PROJECT_DB% ^&^
    mongod --dbpath %CHECKERS_PROJECT_DB%

start cmd /k ^
    ECHO "------------------------------------------------------------------" ^&^
    ECHO "Run Node Server" ^&^
    ECHO "------------------------------------------------------------------" ^&^
    call conda activate DevWeb ^&^
    cd %CHECKERS_PROJECT_SERVEUR% ^&^
    node app.js