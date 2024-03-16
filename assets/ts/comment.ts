//@ts-nocheck
class farallonComment {
    loading: boolean = false;
    post_id: any;
    total: any = 0;
    total_paged: any = 1;
    paged: any = 1;
    constructor() {
        if (!document.querySelector(".post--ingle__comments")) return;
        this.post_id = document.querySelector(
            ".post--ingle__comments"
        )!.dataset.id;
        this.fetchComments();
        this.init();
    }

    fetchComments() {
        fetch(
            window.commentDomain +
                "/post/" +
                this.post_id +
                "/comments?paged=" +
                this.paged
        ).then((res) => {
            res.json().then((data) => {
                const comments = data.payload.comments;
                this.total = data.payload.total;
                this.total_paged = data.payload.total_paged;
                if (this.total_paged > 1) {
                    this.randerNav();
                }
                document.querySelector(".comments--title .count")!.innerHTML =
                    this.total;
                const html = comments
                    .map((item: any) => {
                        let children = "";
                        if (item.children) {
                            children = `<ol class="children">${item.children
                                .map((i) => {
                                    return `<li class="comment" itemtype="http://schema.org/Comment" data-id="${
                                        i.id
                                    }" itemscope="" itemprop="comment" id="comment-${
                                        i.id
                                    }">
                                    <div class="comment-body">
                                    <div class="comment-meta">
                                    <div class="comment--avatar">
                                    ${i.avatar}
                                    </div>
                                    <div class="comment--meta">
                                    <div class="comment--author" itemprop="author">${
                                        i.comment_author
                                    }<span class="dot"></span>
                                    <div class="comment--time humane--time" itemprop="datePublished" datetime="2023-09-22T08:24:25+00:00">${
                                        i.comment_time
                                    }</div>
                                    <span class="comment-reply-link u-cursorPointer " onclick="return addComment.moveForm('comment-${
                                        i.id
                                    }', '${i.id}', 'respond', '${
                                        document.querySelector(
                                            ".post--ingle__comments"
                                        )!.dataset.id
                                    }')"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class=""><g><path d="M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z"></path></g></svg></span>                            </div>
                            </div>
                        </div>
                        <div class="comment-content" itemprop="description">
                            ${i.comment_text}
                        </div>
                    </div>
        </li>`;
                                })
                                .join("")}</ol>`;
                        }

                        return `<li class="comment parent" itemtype="http://schema.org/Comment" data-id="${
                            item.id
                        }" itemscope="" itemprop="comment" id="comment-${
                            item.id
                        }">
                            <div class="comment-body">
                                <div class="comment-meta">
                                    <div class="comment--avatar">
                                        ${item.avatar}
                                    </div>
                                    <div class="comment--meta">
                                        <div class="comment--author" itemprop="author">${
                                            item.comment_author
                                        }<span class="dot"></span>
                                            <div class="comment--time humane--time" itemprop="datePublished" datetime="2023-09-22T08:24:25+00:00">${
                                                item.comment_time
                                            }</div>
                                            <span class="comment-reply-link u-cursorPointer " onclick="return addComment.moveForm('comment-${
                                                item.id
                                            }', '${item.id}', 'respond', '${
                            document.querySelector(".post--ingle__comments")!
                                .dataset.id
                        }')"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class=""><g><path d="M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z"></path></g></svg></span>                            </div>
                                    </div>
                                </div>
                                <div class="comment-content" itemprop="description">
                                    ${item.comment_text}
                                </div>
                            </div>
                            ${children}
                </li>`;
                    })
                    .join("");
                document.querySelector(".commentlist ")!.innerHTML = html;
            });
        });
    }

    randerNav() {
        const nextDisabled = this.paged == 1 ? "disabled" : "";
        const preDisabled = this.paged == this.total_paged ? "disabled" : "";
        const html = `<span class="cnav-item ${preDisabled}" data-action="pre">
        <svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21">
        <path d="M13.402 16.957l-6.478-6.479L13.402 4l.799.71-5.768 5.768 5.768 5.77z" fill-rule="evenodd">
        </path></svg> Older Comments</span><span class="chartPage-verticalDivider"></span><span class="cnav-item ${nextDisabled}" data-action="next">Newer Comments
        <svg class="svgIcon" width="21" height="21" viewBox="0 0 21 21">
        <path d="M8.3 4.2l6.4 6.3-6.4 6.3-.8-.8 5.5-5.5L7.5 5" fill-rule="evenodd">
        </path></svg>
        </span>`;
        document.querySelector(".commentnav")!.innerHTML = html;

        document.querySelectorAll(".cnav-item").forEach((item) => {
            item.addEventListener("click", (e) => {
                if (item.classList.contains("disabled")) return;
                console.log(item);
                const action = item.attributes["data-action"].value;
                console.log(action);
                if (action == "pre") {
                    this.paged += 1;
                } else {
                    this.paged -= 1;
                }
                this.fetchComments();
            });
        });
    }

    private init() {
        if (document.querySelector(".comment-form")) {
            document
                .querySelector(".comment-form")
                ?.addEventListener("submit", (e) => {
                    e.preventDefault();
                    if (this.loading) return;
                    const form = document.querySelector(
                        ".comment-form"
                    ) as HTMLFormElement;
                    // @ts-ignore
                    const formData = new FormData(form);
                    // @ts-ignore
                    const formDataObj: { [index: string]: any } = {};
                    formData.forEach(
                        (value, key: any) => (formDataObj[key] = value)
                    );
                    this.loading = true;
                    // @ts-ignore
                    fetch(
                        window.commentDomain +
                            "/post/" +
                            this.post_id +
                            "/comment",
                        {
                            method: "POST",
                            body: JSON.stringify(formDataObj),
                            headers: {
                                // @ts-ignore
                                // "X-WP-Nonce": obvInit.nonce,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            this.loading = false;
                            if (data.status != 200) {
                                return; //this.showNotice(data.message, "error");
                            }
                            let a = document.getElementById(
                                    "cancel-comment-reply-link"
                                ),
                                i = document.getElementById("respond"),
                                n = document.getElementById("wp-temp-form-div");
                            const comment = data.data;
                            const html = `<li class="comment" id="comment-${comment.comment_ID}">
                        <div class="comment-body comment-body__fresh">
                            <footer class="comment-meta">
                                <div class="comment--avatar">
                                    ${comment.avatar}
                                </div>
                                <div class="comment--meta">
                                    <div class="comment--author">${comment.comment_author}<span class="dot"></span>
                                    <time>刚刚</time>
                                    </div>
                                </div>
                            </footer>
                            <div class="comment-content">
                                ${comment.comment_text}
                            </div>
                        </div>
                    </li>`; // @ts-ignore
                            const parent_id =
                                document.querySelector(
                                    "#comment_parent"
                                )?.value;
                            // @ts-ignore
                            (a.style.display = "none"), // @ts-ignore
                                (a.onclick = null), // @ts-ignore
                                (document.getElementById(
                                    "comment_parent"
                                ).value = "0"),
                                n && // @ts-ignore
                                    i && // @ts-ignore
                                    (n.parentNode.insertBefore(i, n),
                                    n.parentNode.removeChild(n));
                            if (document.querySelector(".comment-body__fresh"))
                                document
                                    .querySelector(".comment-body__fresh")
                                    ?.classList.remove("comment-body__fresh");
                            // @ts-ignore
                            document.getElementById("comment").value = "";
                            // @ts-ignore
                            if (parent_id != "0") {
                                document
                                    .querySelector(
                                        // @ts-ignore
                                        "#comment-" + parent_id
                                    )
                                    ?.insertAdjacentHTML(
                                        "beforeend",
                                        '<ol class="children">' + html + "</ol>"
                                    );
                                console.log(parent_id);
                            } else {
                                if (document.querySelector(".no--comment")) {
                                    document
                                        .querySelector(".no--comment")
                                        ?.remove();
                                }
                                document
                                    .querySelector(".commentlist")
                                    ?.insertAdjacentHTML("beforeend", html);
                            }

                            const newComment = document.querySelector(
                                `#comment-${comment.comment_ID}`
                            ) as HTMLElement;

                            if (newComment) {
                                newComment.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }

                            // this.showNotice("评论成功");
                        });
                });
        }
    }
}

new farallonComment();
