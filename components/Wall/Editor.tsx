import { FormEventHandler, KeyboardEventHandler } from 'react'
import sanitizeHtml from 'sanitize-html';

import { Button } from '../../ui/Button'
import { TextField } from '../../ui/FormField'

type EditorOnSubmitHandler = (value: string, form: HTMLFormElement) => void

export type EditorProps = {
  onSubmit: EditorOnSubmitHandler
  resetOnSubmit?: boolean
  sanitize?: boolean
}

export function Editor({
  resetOnSubmit = true,
  onSubmit: onSubmitCb,
  sanitize = true,
}: EditorProps) {
  const onSubmit: EditorOnSubmitHandler = (value, form) => {
    if (resetOnSubmit) {
      form.reset()
    }

    // Allow only a super restricted set of tags and attributes
    const htmlSanitize = sanitizeHtml(value, {
      allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'span' ],
      allowedAttributes: {
        'a': [ 'href' ]
      },
      allowedIframeHostnames: ['www.youtube.com']
    });

    onSubmitCb(sanitize ? htmlSanitize : value, form)
  }

  const shareStory: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmit(event.currentTarget.story.value, event.currentTarget)
  }

  const submitOnKeyDown: KeyboardEventHandler<HTMLFormElement> = ({
    key,
    metaKey,
    currentTarget,
  }) => {
    if (key === 'Enter' && metaKey) {
      onSubmit(currentTarget.story.value, currentTarget)
    }
  }

  return (
    <form onSubmit={shareStory} onKeyDown={submitOnKeyDown}>
      <TextField
        id="story-input"
        name="story"
        label={'whatsUp'}
        multiline
        minRows={4}
        variant="outlined"
        fullWidth
      />
      <Button variant="outlined" type="submit" className="mt-4">
        share
      </Button>
    </form>
  )
}
