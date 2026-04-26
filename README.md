# Neuronal3D

Minimal MLP in TypeScript (ohne NN-Bibliothek), MNIST über CSV, 3D-Aktivitäten mit Three.js.

## Start

[Corepack](https://nodejs.org/api/corepack.html) aktivieren (empfohlen, damit die richtige pnpm-Version genutzt wird): `corepack enable`

```bash
pnpm install
pnpm start
```

## MNIST-CSV

Format: eine Zeile pro Bild, **785 Spalten** — Spalte 1 = Label 0–9, Spalten 2–785 = Pixel 0–255 (Zeile für Zeile, 28×28). Entspricht z. B. den Dateien von Kaggle „mnist-as-csv“ (`mnist_train.csv`, `mnist_test.csv`).

In der Webapp Train- und Test-CSV auswählen, dann „Training starten“. Nach dem Training: „Zufälliges Testbild“ oder auf dem Canvas malen und „Canvas inferieren“.

## Anpassung

In `src/main.ts`: Lernrate, `batchSize`, `epochs`, `vizEveryNBatches` im `trainLoop`-Aufruf.
