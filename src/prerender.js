import { h } from 'hyperapp'
import { getPage } from '@finepoint/hyperapp-page'
import { mergeHead } from '@finepoint/hyperapp-head'
import { renderToStream } from 'hyperapp-render'

export function prerender ({ prestate, view, head, script }) {
    function resolveNode (node) {
        if (typeof node === 'function') {
            return resolveNode(node(prestate, {}))
        } else {
            return node
        }
    }

    head = resolveNode(head) || h('head')

    const doc =
        h('html', null, [
            head,
            h('body', null, [
                view,
                script
            ])
        ])

    if (prestate) {
        // NOTE: XSS vulnerable.
        head.children.push(
            h('script', { innerHTML: 'window.prestate=' + JSON.stringify(prestate) })
        )

        const page = getPage(prestate)

        if (head && page && page.head) {
            mergeHead(head, resolveNode(page.head))
        }
    }

    return renderToStream(doc, prestate)
}
