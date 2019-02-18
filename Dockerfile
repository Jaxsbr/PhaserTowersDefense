FROM mcr.microsoft.com/windows/servercore/iis:windowsservercore-1803

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

WORKDIR /inetpub/wwwroot

COPY . .