
declare interface TitleInfo {
  text: string,
  nobotOverride: boolean
}

declare interface Plugin {
  name: string,
  handle: (message: string) => Replies
}

declare type Replies = Promise<Array<string>>
