# Assignment 3 - Jenkins CI/CD Pipeline with Azure Function App

This demonstrates a complete CI/CD pipeline using Jenkins to build, test, and deploy an Azure Function written in JavaScript (Node.js). The goal is to automate the workflow using Jenkins stages including test validation, packaging, and Azure deployment.

## Tech Stack
- Azure Functions (Node.js)
- Jenkins Pipeline
- Jest for Testing
- GitHub Repository Integration
- Azure Portal (Function App + Resource Group)
- Windows Batch Shell for Jenkins

# Create a service principal with RBAC for Jenkins integration
powershell
```
az ad sp create-for-rbac \
  --name "jenkins-jithin-sp" \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/rg-jithin-jenkins \
  --sdk-auth
  ```

## Jenkins Pipeline Overview Overview

1. **Checkout SCM**: Clones the GitHub repo containing the Azure Function.
2. **Install Dependencies**: Runs `npm install` to prepare the environment.
3. **Run Tests**: Executes Jest unit tests.
   ![run-test](images/run-test.png)
4. **Package Function App**: Prepares the Azure Function App for deployment.
5. **Deploy to Azure Function**: Uploads the package to Azure.
   ![deploy-azure-function](images/deploy-azure-function.png)
6. **Verify Deployment**: Confirms the function is deployed and responsive.
   ![function-test-success-output](images/function-test-success-output.png)
7. **Post Actions**: Wraps up the pipeline.

## Azure Portal Validation

### Resource Group
The function app and supporting resources appear under the expected resource group:
![azure-resource-group-overview](images/azure-resource-group-overview.png)

### Azure Function Overview
The deployed function is listed and active in the Azure portal:
![azure-function-overview](images/azure-function-overview.png)

### Code Verification
You can inspect the deployed code inside Azure:
![azure-function-code-editor](images/azure-function-code-editor.png)

## Runtime Verification

### Function Running Log
Confirmation that the function is active:
![function-running](images/function-running.png)

### Browser Output
When accessed in a browser, the function responds correctly:
![browser-success](images/browser-success.png)

## Jenkins Pipeline Proof

### Console Output
Shows logs for all executed stages:
![jenkins-console-output](images/jenkins-console-output.png)

### Pipeline Success UI
Visually confirms all steps passed:
![jenkins-pipeline-success](images/jenkins-pipeline-success.png)

## Summary

This pipeline ensures the Azure Function is tested, built, and deployed automatically with each Git commit or manual trigger. All steps are verifiable via Jenkins and Azure.

---
**Note:** Make sure your Jenkins server is configured with necessary Azure credentials and that the Azure CLI is installed on the agent.


---