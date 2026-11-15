# Project evidence — verified October 19, 2026

Repositories and PR diffs were inspected read-only. Deployment configuration does not establish current deployment availability.

## Featured projects

### Abyss — team project

The owner requested plain contribution descriptions without individual PR links or merged-status claims. The portfolio describes MCP tools, job execution, spending controls, retries, and reconnect handling from the previously reviewed source. These are implementation capabilities, not measured performance or adoption results.

### Redis Clone

The initial audit revision `c7865d7fe24fdf53b637d49d5c5b7473df1f508f` contained only a README. A final upstream recheck found a force update to `8c3036d553ebeaca10e750c2bb79682b123bb504`. Inspected the full [src/main.c](https://github.com/zakiscoding/redis-clone/blob/8c3036d553ebeaca10e750c2bb79682b123bb504/src/main.c), CMakeLists.txt and launch script. Source implements TCP sockets and a `select()` client loop, RESP array/bulk-string parsing and replies, in-memory string/list entries, counters, conditional SET, EX/PX expiry, TTL/PTTL, deletion and list operations. The card accurately says **C**, not C++, and makes no latency, nonblocking-I/O, persistence or production-reliability claims. No live demo was verified.

### Homelab projects — update of November 14, 2026

All seven repositories linked from the homelab docs hub are now public. This update reads each README at the revision below; the numbers on the cards come from those READMEs and their linked results files. The code was not re-run for this update.

| Repository | Revision |
| --- | --- |
| [homelab](https://github.com/zakiscoding/homelab) | `069b43b7d368ee177cd08a0da25c731fc072e149` |
| [homelab-services](https://github.com/zakiscoding/homelab-services) | `573985618bf3bcb228713e47152ccabecf28457a` |
| [homelab-gpu](https://github.com/zakiscoding/homelab-gpu) | `f4a8603882b42a24ccb32d1695e5524cb245487b` |
| [homelab-web](https://github.com/zakiscoding/homelab-web) | `bbbbdbbfce06e5c49cd14a32bd098d75557b4441` |
| [gpu-systems-lab](https://github.com/zakiscoding/gpu-systems-lab) | `d0fd08a76e07fa8c0ff4b5f61ccbf8918839c9d2` |
| [gophergrid](https://github.com/zakiscoding/gophergrid) | head of `main` on November 14, 2026 |
| [low-latency-trading-engine](https://github.com/zakiscoding/low-latency-trading-engine) | head of `main` on November 14, 2026 |

- **Homelab AI Platform** (renamed from Homelab Infrastructure): the job queue, Cloudflare gateway, OpenTelemetry/SLO alerting, public dashboards and Terraform/Ansible claims come from the homelab and homelab-services READMEs. Terraform/Ansible are not yet applied to the real account and nodes, so the card says "codified", not "deployed with". The private-access note was removed.
- **GPU Systems Lab:** kernel, NCCL, FSDP2/DeepSpeed, elastic restart, router and operator claims come from the README's "What's inside" and tour table. The operator was tested with envtest and kind; the real-node run is unclaimed.
- **GopherGrid:** failover, throughput and latency figures come from the README's headline table (laptop Docker runs plus the homelab run).
- **Low-Latency Trading Engine:** the README says every latency number was measured on a laptop VM, so the card states no latency figures. The paper-trading URL returned HTTP 200 on November 14, 2026.
- The public dashboards, results page and paper-trading URLs returned HTTP 200 on November 14, 2026.

### Homelab Infrastructure (original audit, October 19, 2026)

Inspected four repositories, then private:

| Repository | Revision |
| --- | --- |
| [homelab](https://github.com/zakiscoding/homelab) | `84e2e61457beab9c66ddaba0f57acd6124a6c357` |
| [homelab-services](https://github.com/zakiscoding/homelab-services) | `440d1630fc6b8514557307080878149683a37fcd` |
| [homelab-gpu](https://github.com/zakiscoding/homelab-gpu) | `7002fc592f837a0d9aa1c4bf5a888c9475d02fa7` |
| [homelab-web](https://github.com/zakiscoding/homelab-web) | `3f647254b25df9fd7762bbe86a96783cc258977e` |

`homelab-services/docker-compose.yml`, `api/jobs.py`, worker loops, monitoring provisioning and API routes substantiate Docker Compose, FastAPI, PostgreSQL job leases/retries, Redis wakeups, Qdrant/RAG and Prometheus/Grafana/MLflow configuration. GPU `training/lora_quickstart/train.py`, worker scripts and web proxy routes support LoRA training and inference integration. Documentation establishes Tailscale/Caddy networking and Ollama. Publish only high-level architecture; no internal addresses, hostnames or credentials. Repository links explicitly require private access.

### Housing Price MLOps

Replaces TaskMesh after the owner's instruction to skip it. At `6661866356fa87e48b64d2ddf66a1302144ff0d3`, inspected [tune.py](https://github.com/zakiscoding/Housing-Regression-Model/blob/6661866356fa87e48b64d2ddf66a1302144ff0d3/src/training_pipeline/tune.py), feature/training/evaluation pipelines, [API main.py](https://github.com/zakiscoding/Housing-Regression-Model/blob/6661866356fa87e48b64d2ddf66a1302144ff0d3/src/api/main.py) and `.github/workflows/ci.yml`. Code establishes XGBoost, Optuna, MLflow, S3 artifact loading, FastAPI inference and ECR/ECS CI delivery. No accuracy or uptime metrics are asserted.

### Kash

At `1c3a4d98127345c101a32b06022309e6de2b95fe`, [transaction.js](https://github.com/zakiscoding/Kash/blob/1c3a4d98127345c101a32b06022309e6de2b95fe/actions/transaction.js), account/dashboard actions, `prisma/schema.prisma`, and `lib/inngest/functions.js` establish Clerk user checks, transactions, Prisma/PostgreSQL, Gemini receipt extraction, recurring transactions, budget checks and email functions. `https://kash-nine.vercel.app` returned HTTP 403 in browser verification; its demo link is omitted. The generic finance banner is not an application screenshot and is not used as one.

### EMOTION

At `a9bb0816b6f4177289c4cb0b04bc19eb07f402ab`, [models.py](https://github.com/zakiscoding/EMOTION-Multimodal-AI-Model/blob/a9bb0816b6f4177289c4cb0b04bc19eb07f402ab/multimodal/training/models.py) implements BERT text features, R3D-18 video, audio Conv1d layers, concatenated modality projections, feature fusion, and 7-emotion/3-sentiment heads. `meld_dataset.py` supplies MELD preprocessing; `train.py` evaluates held-out data. Evaluation uses accuracy and weighted precision. SageMaker and TensorBoard/CloudWatch code is present. No invented benchmark scores or live endpoint are published.

## Secondary projects

- **QuickBite:** revision `ebcba1f8498b5d333c804e5214bdaaf2918705e1`. Reviewed Next.js route handlers, Supabase service code, OpenAI integration and customer/driver order/message workflows. A collaborative fork of `bobbleteeb/Team-Sleep`, also described in the software resume. [Deployment](https://team-sleep-liart.vercel.app) returned HTTP 200 and rendered QuickBite sign-in. `public/projects/quickbite.png` is a direct browser capture dated October 19, 2026. The demo link states that sign-in is required.
- **Amazon Prime CI/CD:** revision `2efdaed59c24e674fb0a7a2b9692956e14634af8`. Reviewed `pipeline_script/build_pipeline`, deployment scripts, Dockerfile, `terraform_code/` and `k8s_files/`. Supports quality analysis, Trivy scans, container/ECR steps, Terraform and Kubernetes configuration. No active production deployment is inferred; the pipeline is not described as exactly six stages because source contains more.

## Resume evidence

Read all nine supplied `Zakariye_Mohamed_{AI,Infra,Software}_Resume{,-,_}.pdf` variants from the specified local folder. Infrastructure/software resumes support SFTP batch onboarding/monitoring (InComm), Sentinel/Django/PostgreSQL/ELK/Terraform/OpenShift (IBM), TensorFlow/Keras/RAG/MCP (Cornell), Bamboo/Artifactory/Python/Bash/cloud/BLE Mesh (Signify), and AWS container microservices/RAG/MCP/expiring memory (Crescent). Role summaries omit unnecessary metrics. Skills are corroborated by these resumes and project code. Georgia Tech admission appears in underscore variants; the task's explicit enrollment wording takes precedence over variant graduation dates. Resume binaries and extracted personal documents are not copied into this repository.

TaskMesh is excluded from all rendered project and contribution content at the owner's request. The pre-implementation audit retains its original investigation notes.

## Current presentation overrides

The owner requested replacing MyCalibrator RE with Redis Clone and Repo Intel with Abyss in More Projects. Both replacements reuse the verified featured definitions. The owner also requested contribution descriptions without individual PR links, counts, or status claims; the displayed section now groups Abyss work into five engineering summaries. The initial PR audit above records research evidence rather than the current UI.

The owner-provided [Abyss fork](https://github.com/zakiscoding/abysss) resolves publicly and GitHub confirms `jtdao24/abyss` as its parent. It is used for the project repository links, with collaborative attribution retained. The owner-provided [eCornell credential](https://mycredentials.ecornell.cornell.edu/credential/OEbTFqATTf) returned HTTP 200 and identifies "Machine Learning Foundations". The resume also lists this credential. Its verified title and direct verification URL are added locally without inventing issue/expiry dates or modifying CMS records.

## Presentation polish

Redis Clone and Abyss now appear once, in Featured Projects; More Projects contains QuickBite and Amazon Prime CI/CD. Native disclosures preserve full engineering details while short highlights improve scanning. Public contribution content remains descriptive and contains no individual PR links or status claims.

The new Abyss preview is a genuine screenshot from the owner's fork (`1b7723ef5ebb97d4868e6dfdfa878e16d92afdd3`) running its own fixture-replay mode locally; the caption states this explicitly. The Amazon Prime preview is its existing `src/Overview.png` architecture image, labeled as a repository diagram. Other featured visuals are code-native source-based architecture diagrams, not fabricated application screenshots. See verification.md for provenance and runtime checks.


### Audio CNN Visualizer

Added to More Projects on October 20, 2026. Reviewed the public Audio_CNN README, model.py, and main.py. The residual CNN exposes intermediate feature maps; Modal inference resamples audio to 44.1 kHz, computes 128-bin mel-spectrograms, returns top-three predictions and visualization arrays. README documents ESC-50, MixUp, TensorBoard, checkpoints and the Next.js frontend. The deployed frontend returned HTTP 200; inference was not exercised. No accuracy or latency measurements are claimed.
