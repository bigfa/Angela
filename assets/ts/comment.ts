import { farallonHelper } from "./utils";
interface farallonCommentOptions {
    actionDomain: string;
}

export class farallonComment extends farallonHelper {
    loading: boolean = false;
    post_id: any;
    total: any = 0;
    total_paged: any = 1;
    paged: any = 1;
    actionDomain: string;
    dateFormater: any;
    constructor(config: farallonCommentOptions) {
        super();
        if (!document.querySelector(".post--ingle__comments")) return;
        this.actionDomain = config.actionDomain;
        this.post_id = (
            document.querySelector(".post--ingle__comments") as HTMLElement
        ).dataset.id;
        this.fetchComments();
        this.init();
    }

    renderComment(item: any, children: any = "", reply: boolean = true) {
        const replyHtml: string = reply
            ? `<span class="comment-reply-link u-cursorPointer" onclick="return addComment.moveForm('comment-${
                  item.comment_id
              }', '${item.comment_id}', 'respond', '${
                  (document.querySelector(
                      ".post--ingle__comments"
                  ) as HTMLElement)!.dataset.id
              }')"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" class=""><g><path d="M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z"></path></g></svg></span>                            `
            : "";
        return `<li class="comment parent" itemtype="http://schema.org/Comment" data-id="${item.comment_id}" itemscope="" itemprop="comment" id="comment-${item.comment_id}">
                            <div class="comment-body">
                                <div class="comment-meta">
                                    <div class="comment--avatar">
                                        <img src="${item.avatar}" class="avatar"  width=42 height=42 />
                                    </div>
                                    <div class="comment--meta">
                                        <div class="comment--author" itemprop="author">${item.comment_author_name}<span class="dot"></span>
                                            <div class="comment--time" itemprop="datePublished" datetime="${item.comment_date}">${item.comment_date}</div>
                                            </div>
                                            ${replyHtml}
                                    </div>
                                </div>
                                <div class="comment-content" itemprop="description">
                                    ${item.comment_content}
                                </div>
                            </div>
                            ${children}
                </li>`;
    }

    async fetchComments() {
        fetch(
            this.actionDomain +
                "comment/list?paged=" +
                this.paged +
                "&post_id=" +
                this.post_id
        ).then((res) => {
            res.json().then((data) => {
                const comments = data.results;
                this.total = data.total;
                this.total_paged = data.total_paged;
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
                                    return this.renderComment(i);
                                })
                                .join("")}</ol>`;
                        }

                        return this.renderComment(item, children);
                    })
                    .join("");
                document.querySelector(".commentlist")!.innerHTML = html;
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
            if (this.getCookie("comment_author") != "") {
                (document.querySelector("#author") as HTMLInputElement).value =
                    this.getCookie("comment_author");
            }

            if (this.getCookie("comment_author_email") != "") {
                (document.querySelector("#email") as HTMLInputElement).value =
                    this.getCookie("comment_author_email");
            }

            if (this.getCookie("comment_author_url") != "") {
                (document.querySelector("#url") as HTMLInputElement).value =
                    this.getCookie("comment_author_url");
            }

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
                    formDataObj["post_id"] = this.post_id;
                    this.loading = true;
                    fetch(this.actionDomain + "comment/insert", {
                        method: "POST",
                        body: JSON.stringify(formDataObj),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            this.loading = false;
                            if (data.status != 200) {
                                return this.showNotice(data.err, "error");
                            }
                            let a = document.getElementById(
                                    "cancel-comment-reply-link"
                                ),
                                i = document.getElementById("respond"),
                                n = document.getElementById("wp-temp-form-div");
                            const comment = data.data;
                            const html = this.renderComment(comment, "", false);
                            const parent_id = (
                                document.querySelector(
                                    "#comment_parent"
                                ) as HTMLInputElement
                            )?.value;
                            // @ts-ignore
                            (a.style.display = "none"), // @ts-ignore
                                (a.onclick = null), // @ts-ignore
                                ((
                                    document.getElementById(
                                        "comment_parent"
                                    ) as HTMLInputElement
                                ).value = "0"),
                                n && // @ts-ignore
                                    i && // @ts-ignore
                                    n.parentNode &&
                                    n.parentNode.removeChild(n);
                            if (document.querySelector(".comment-body__fresh"))
                                document
                                    .querySelector(".comment-body__fresh")
                                    ?.classList.remove("comment-body__fresh");
                            // @ts-ignore
                            document.getElementById("comment").value = "";
                            // @ts-ignore
                            if (parent_id != "") {
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
                                `#comment-${comment.comment_id}`
                            ) as HTMLElement;

                            if (newComment) {
                                newComment.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }

                            this.setCookie(
                                "comment_author",
                                (
                                    document.querySelector(
                                        "#author"
                                    ) as HTMLInputElement
                                ).value,
                                1
                            );

                            this.setCookie(
                                "comment_author_email",
                                (
                                    document.querySelector(
                                        "#email"
                                    ) as HTMLInputElement
                                ).value,
                                1
                            );

                            this.setCookie(
                                "comment_author_url",
                                (
                                    document.querySelector(
                                        "#url"
                                    ) as HTMLInputElement
                                ).value,
                                1
                            );

                            this.showNotice("评论成功");
                        });
                });
        }
    }
}
