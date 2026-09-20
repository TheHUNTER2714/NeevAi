defmodule NeevAi.MixProject do
  use Mix.Project

  def project do
    [
      app: :neev_ai,
      version: "0.1.0",
      elixir: ">= 1.14.0",
      aliases: aliases()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp aliases do
    [
      "phx.digest": ["cmd npm install && npm run build"],
      "phx.server": ["cmd node server.js"]
    ]
  end
end
