pipeline {
    agent any

    environment {
        AZURE_FUNCTIONAPP_NAME = 'jithin-func-hello'
        AZURE_RESOURCE_GROUP   = 'rg-jithin-jenkins'

        AZURE_CLIENT_ID       = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET   = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID       = credentials('AZURE_TENANT_ID')
        AZURE_SUBSCRIPTION_ID = credentials('AZURE_SUBSCRIPTION_ID')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git url: 'https://github.com/JithinJyothi95/Assigment3-Jenkins-Pipeline.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo ' Installing Node.js dependencies...'
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'npm test'
            }
        }

        stage('Package Function App') {
            steps {
                echo 'Packaging Azure Function App for deployment...'
                bat '''
                    REM Clean up any previous package
                    if exist function.zip del /f /q function.zip
                    if exist deploy rmdir /s /q deploy

                    REM Create deployment folder
                    mkdir deploy
                    xcopy /E /I /Y src deploy\\src
                    copy host.json deploy\\
                    copy package.json deploy\\
                    if exist local.settings.json copy local.settings.json deploy\\

                    REM Zip everything inside deploy/
                    cd deploy
                    powershell Compress-Archive -Path * -DestinationPath ..\\function.zip -Force
                    cd ..

                    REM Check if zip was created
                    powershell "if (!(Test-Path function.zip)) { Write-Error ' Zip file creation failed'; exit 1 }"
                '''
            }
        }

        stage('Deploy to Azure Function') {
            steps {
                echo 'Deploying to Azure Function App...'
                bat """
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az account set --subscription %AZURE_SUBSCRIPTION_ID%
                    az functionapp deployment source config-zip ^
                        --resource-group %AZURE_RESOURCE_GROUP% ^
                        --name %AZURE_FUNCTIONAPP_NAME% ^
                        --src function.zip
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment status...'
                bat """
                    az functionapp show ^
                        --resource-group %AZURE_RESOURCE_GROUP% ^
                        --name %AZURE_FUNCTIONAPP_NAME% ^
                        --query "state" -o tsv
                """
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution is finished'
            bat 'if exist function.zip del /f /q function.zip'
            bat 'if exist deploy rmdir /s /q deploy'
        }
        success {
            echo 'SUCCESS: Function is deployed to Azure!'
        }
        failure {
            echo 'FAILURE: Something went wrong'
        }
    }
}