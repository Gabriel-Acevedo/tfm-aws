FROM node:12

ENV SAM_CLI_TELEMETRY 0

RUN apk --update --no-cache add jq curl bash gcc musl-dev

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
