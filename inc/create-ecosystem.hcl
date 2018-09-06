consul {
  retry {
    enabled = true
    attempts = 3
    backoff = "250ms"
    max_backoff = "1m"
  }
}
log_level = "info"
wait = "1s:45s"
pid_file = "/tmp/consul-template.pid"
template {
  source = "/ecosystem.ctmpl"
  destination = "/app/src/ecosystem.json"
  perms = 0600
  backup = false
  command = "sh -c 'pgrep consul-template | xargs kill -HUP'"
}